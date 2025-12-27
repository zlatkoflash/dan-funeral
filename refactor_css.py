import re
import os

file_path = "c:\\xampp\\htdocs\\projects\\DanSalganikGR\\nextjs\\gentle-road\\assets\\css\\Style-edited.scss"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Regex patterns
# We capture the property and the value.
# We need to be careful with semi-colons.
# Pattern: (padding|margin|font-size)(?:-[a-z]+)?\s*:\s*([^;]+);
pattern = re.compile(r'(padding(?:-[a-z]+)?|margin(?:-[a-z]+)?|font-size)\s*:\s*([^;]+);')

matches = pattern.findall(content)

variables = {}
variable_counts = {'p': 0, 'm': 0, 'fz': 0}

def generate_var_name(prop, value):
    prefix = ''
    if 'padding' in prop:
        prefix = 'p'
    elif 'margin' in prop:
        prefix = 'm'
    elif 'font-size' in prop:
        prefix = 'fz'
    
    # Clean value to make it variable-friendly
    # remove var(--delta) part for naming if present to make it shorter? 
    # User said "name it the paddings with the size".
    # e.g. calc(1.3*var(--delta)) -> 1-3-delta
    
    clean_val = value.replace('var(--delta)', 'delta')
    clean_val = clean_val.replace('calc', '')
    clean_val = clean_val.replace('(', '').replace(')', '')
    clean_val = clean_val.replace('*', '-')
    clean_val = clean_val.replace('/', 'div')
    clean_val = clean_val.replace('+', 'plus')
    clean_val = clean_val.replace(' ', '')
    clean_val = clean_val.replace('.', '-')
    clean_val = clean_val.replace(',', '-')
    clean_val = clean_val.replace('%', 'pct')
    
    # Handle hex colors if they accidentally got here (shouldn't for padding/margin but maybe font-size color? No, property restricted)
    
    # Shorten multiple dashes
    clean_val = re.sub(r'-+', '-', clean_val)
    clean_val = clean_val.strip('-')
    
    if not clean_val:
        clean_val = '0'

    var_name = f"--{prefix}-{clean_val}"
    return var_name

unique_replacements = {} # Map 'prop: value;' -> 'prop: var(...);'

for prop, value in matches:
    key = (prop, value.strip())
    
    # Logic to handle multipart values like 'padding: 10px 20px'
    # For now, let's treat the whole value as one variable unless it's obviously separable?
    # The user said "all padings...".
    # Complex values usually stay together.
    
    var_name = generate_var_name(prop, value)
    
    # Checking collision
    if value not in variables.values():
         # Store reverse mapping to ensure we don't duplicate variables for same value
        found = False
        for vname, val in variables.items():
            if val == value:
                var_name = vname
                found = True
                break
        if not found:
             # Ensure unique name if value is different but name collided (unlikely with this naming scheme but possible)
             if var_name in variables:
                 counter = 1
                 while f"{var_name}-{counter}" in variables:
                     counter += 1
                 var_name = f"{var_name}-{counter}"
             
             variables[var_name] = value

    # We need the var name for this specific value
    # But wait, earlier loop logic was slightly flawed.
    # Let's just find the var name for this value.
    
    # Re-find or create
    final_var_name = None
    for vname, val in variables.items():
        if val == value:
            final_var_name = vname
            break
            
    if not final_var_name:
         # Should have been added above, but just in case logic
         final_var_name = generate_var_name(prop, value)
         if final_var_name in variables and variables[final_var_name] != value:
              # Collision
              counter = 1
              while f"{final_var_name}-{counter}" in variables:
                  counter += 1
              final_var_name = f"{final_var_name}-{counter}"
         variables[final_var_name] = value

    unique_replacements[key] = f"{prop}: var({final_var_name});"

# Generate new content
new_root_content = "\n:root {\n"
sorted_vars = sorted(variables.items(), key=lambda item: item[0]) # Sort by name
for var_name, value in sorted_vars:
    new_root_content += f"  {var_name}: {value};\n"
new_root_content += "}\n"

# Replace in content
# We need to be careful about overlapping replacements.
# Strategy: iterate over unique original strings and replace them.
# Better: use regex sub with a callback.

def replace_match(match):
    prop = match.group(1)
    value = match.group(2)
    key = (prop, value.strip())
    if key in unique_replacements:
        return unique_replacements[key]
    return match.group(0)

new_content = pattern.sub(replace_match, content)

# Check where to insert the new root
# "in another :root after first root"
# Find the first closing regex of :root
root_end_match = re.search(r':root\s*\{[^}]+\}', new_content, re.DOTALL)
if root_end_match:
    insert_pos = root_end_match.end()
    final_content = new_content[:insert_pos] + "\n\n/* Generated Variables */" + new_root_content + new_content[insert_pos:]
else:
    # Append appropriately if no root found (unlikely)
    final_content = new_root_content + new_content

print("Variables found:", len(variables))
print("Sample Variables:")
for k, v in list(variables.items())[:5]:
    print(f"{k}: {v}")

with open('style_refactored_preview.scss', 'w', encoding='utf-8') as f:
    f.write(final_content)
