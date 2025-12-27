import re
import os

FILE_PATH = r'c:\xampp\htdocs\projects\DanSalganikGR\nextjs\gentle-road\assets\css\Style-edited.scss'

# Regex patterns
# Match properties: padding*, margin*, font-size
# We capture the property and the value.
# Value matches until semicolon or closing brace (if ends without semicolon which is rare but possible in last item)
# We need to be careful with nested parenthesis in calc.
# A robust regex for value is tricky, so we might line-scan.

PROPERTIES_TO_REFACTOR = {
    'padding': '--p-',
    'margin': '--m-',
    'font-size': '--fs-'
}

def get_variable_name(prefix, value):
    # Remove !important for naming (we keep it in value)
    clean_val = value.replace('!important', '').strip()
    
    # Check for calc(NUMBER*var(--delta))
    match_delta = re.match(r'calc\(\s*([\d\.]+)\s*\*\s*var\(--delta\)\s*\)', clean_val)
    if match_delta:
        num = match_delta.group(1)
        # 1.6 -> 1-6
        name_part = num.replace('.', '-')
        return f"{prefix}{name_part}"
    
    # Check for just units like 10px, 5%
    # We want simple filenames.
    # If complex, we might just hash or skip?
    # User requested: "names should have prefixes ... and --fs- for font sizes"
    # User didn't specify exactly what to do with complex values, but implied simple ones.
    # Let's try to slugify the value.
    
    # If it's a simple number+unit
    if re.match(r'^[\d\.]+[a-z%]+$', clean_val):
        return f"{prefix}{clean_val}"
    
    # If it's 0 or 0px
    if clean_val in ['0', '0px']:
        return f"{prefix}0"
        
    # If it's auto
    if clean_val == 'auto':
        return f"{prefix}auto"
        
    return None # Skip complex values or mixed values like "10px 20px" if not easily mappable or just handle them if possible?
    # Actually user said "create css variables for all paddings..."
    # If we have "padding: 10px 20px", we should probably split it?
    # Or create a variable for the combo?
    # Usually "variables for margins" implies the values.
    # But replacing "margin: 10px 20px" with "margin: var(--m-10px-20px)" is valid.
    # Let's try to map the whole value string to a variable.
    
    slug = clean_val
    slug = re.sub(r'[^\w\d\-\.]', '-', slug) # Replace non-alphanumeric with dash
    slug = re.sub(r'\-+', '-', slug) # Collapse dashes
    slug = slug.strip('-')
    
    # If it is calc(1.6...)
    # The first check covered specific delta pattern. This covers others.
    return f"{prefix}{slug}"


def main():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Dictionary to store mapped variables: { 'variable-name': 'value' }
    variables = {}
    
    # Regex to find these properties.
    # property: value;
    # (padding(?:-[a-z]+)?|margin(?:-[a-z]+)?|font-size)\s*:\s*([^;]+);
    
    pattern = re.compile(r'(?<!-)\b(padding(?:-[a-z]+)?|margin(?:-[a-z]+)?|font-size)\s*:\s*([^;\}]+)(;|(?=\}))')
    
    def replacement(match):
        prop = match.group(1)
        val = match.group(2).strip()
        terminator = match.group(3)
        
        # Determine prefix
        prefix = '--unknown-'
        if 'padding' in prop:
            prefix = '--p-'
        elif 'margin' in prop:
            prefix = '--m-'
        elif 'font-size' in prop:
            prefix = '--fs-'
            
        # Generate var name
        # We need to handle the value carefully.
        # If value uses existing vars (other than delta), we might want to keep it?
        # But instructions say "put in body".
        
        var_name = get_variable_name(prefix, val)
        
        if not var_name:
            return match.group(0) # No change
            
        # Store variable
        # If mapping exists with different value, we have a collision?
        # Actually mapping is name -> value.
        # If we generated same name for different value, that's bad.
        # But our generation is based on value, so name is unique to value (mostly).
        # We should check inverse mapping or just overwrite as it should be identical.
        
        if var_name in variables:
            if variables[var_name] != val:
                # Collision for same name different value? Unexpected with our naming scheme.
                # Only if clean_val process loses info. 
                # e.g. "10px !important" vs "10px".
                # get_variable_name removes !important.
                # So we should include !important in the var value?
                # No, usually var is just value, !important is outside.
                # But here we replace the whole value.
                # If value is "10px !important", we can make var "--p-10px" = "10px", and usage "var(--p-10px) !important".
                pass
        
        # Refined strategy:
        # 1. Clean value (remove !important).
        # 2. Generate name from clean value.
        # 3. Add to dict: name -> clean value.
        # 4. Return new string: "prop: var(name) [!important];"
        
        is_important = '!important' in val
        clean_val = val.replace('!important', '').strip()
        
        var_name = get_variable_name(prefix, clean_val)
        variables[var_name] = clean_val
        
        new_val = f"var({var_name})"
        if is_important:
            new_val += " !important"
            
        return f"{prop}: {new_val}{terminator}"

    new_content = pattern.sub(replacement, content)
    
    # Now inject variables into body
    # Find "body {"
    body_match = re.search(r'body\s*\{', new_content)
    if body_match:
        # Construct vars block
        vars_block = "\n"
        # Sort variables for tidiness
        for name in sorted(variables.keys()):
            vars_block += f"  {name}: {variables[name]};\n"
        
        insert_pos = body_match.end()
        new_content = new_content[:insert_pos] + vars_block + new_content[insert_pos:]
    else:
        # Append to end if no body? specific request said "put in body".
        # If no body found, we might add one?
        # The file viewed earlier had body.
        print("Error: body selector not found.")
        return

    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Refactoring complete. Defined {len(variables)} variables.")

if __name__ == '__main__':
    main()
