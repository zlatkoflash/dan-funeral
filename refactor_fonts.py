
import re

file_path = r"c:\xampp\htdocs\projects\DanSalganikGR\nextjs\gentle-road\assets\css\Style-Template.scss"

replacements = [
    (r"font-size:\s*calc\(\.875\*var\(--delta\)\);", "font-size: var(--fs-8_75);"),
    (r"font-size:\s*calc\(1\*var\(--delta\)\);", "font-size: var(--fs-10);"),
    (r"font-size:\s*calc\(1\.1\*var\(--delta\)\);", "font-size: var(--fs-11);"),
    (r"font-size:\s*calc\(1\.4\*var\(--delta\)\);", "font-size: var(--fs-14);"),
    (r"font-size:\s*calc\(1\.6\*var\(--delta\)\);", "font-size: var(--fs-16);"),
    (r"font-size:\s*calc\(2\*var\(--delta\)\);", "font-size: var(--fs-20);"),
    (r"font-size:\s*calc\(2\.16\*var\(--delta\)\);", "font-size: var(--fs-21_6);"),
    (r"font-size:\s*calc\(2\.25\*var\(--delta\)\);", "font-size: var(--fs-22_5);"),
    (r"font-size:\s*calc\(2\.4\*var\(--delta\)\);", "font-size: var(--fs-24);"),
    (r"font-size:\s*calc\(2\.6\*var\(--delta\)\);", "font-size: var(--fs-26);"),
    (r"font-size:\s*calc\(3\.2\*var\(--delta\)\);", "font-size: var(--fs-32);"),
    (r"font-size:\s*calc\(4\*var\(--delta\)\);", "font-size: var(--fs-40);"),
    (r"font-size:\s*calc\(5\*var\(--delta\)\);", "font-size: var(--fs-50);"),
    (r"font-size:\s*calc\(6\*var\(--delta\)\);", "font-size: var(--fs-60);"),
    (r"font-size:\s*calc\(6\.4\*var\(--delta\)\);", "font-size: var(--fs-64);"),
    (r"font-size:\s*calc\(8\*var\(--delta\)\);", "font-size: var(--fs-80);"),
    (r"font-size:\s*1rem;", "font-size: var(--fs-1rem);"),
]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Processed {file_path}")
