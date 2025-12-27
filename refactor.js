const fs = require('fs');

const FILE_PATH = 'assets/css/Style-Template.scss';
const content = fs.readFileSync(FILE_PATH, 'utf8');

const definitions = new Map(); // key: variable name, value: calc expression

function floatToVarName(val) {
    let s = val.toString().replace('.', '-');
    if (s.startsWith('-')) s = '0' + s;
    return s;
}

function processLine(line) {
    // Regex to match padding, margin, font-size properties
    // Look for: property: ...;
    const propertyRegex = /(?<!-)\b(padding|margin|font-size)(?:-[a-z]+)*\s*:\s*([^;]+);/g;

    return line.replace(propertyRegex, (match, propName, value) => {
        // Now inside the value, look for calc(N*var(--delta))
        const calcRegex = /calc\(([\d\.]+)\*var\(--delta\)\)/g;

        let prefix = '';
        if (propName.includes('padding')) prefix = 'p';
        else if (propName.includes('margin')) prefix = 'm';
        else if (propName.includes('font-size')) prefix = 'fs';
        else return match; // Should not happen given regex

        const newValue = value.replace(calcRegex, (calcMatch, number) => {
            const varName = `--${prefix}-${floatToVarName(number)}`;
            definitions.set(varName, calcMatch);
            return `var(${varName})`;
        });

        return `${propName}: ${newValue};`;
    });
}

const lines = content.split('\n');
const newLines = lines.map(processLine);

// Generate definitions block
let defsString = '';
// Sort keys for consistent output
const sortedKeys = Array.from(definitions.keys()).sort((a, b) => {
    // simple sort, or sort by number? user didn't specify. simple alpha sort is fine.
    // actually, let's sort by prefix then number value to look nice
    const getParts = (k) => {
        const p = k.split('-');
        // --p-1-6 -> ['', '', p, 1, 6]
        const type = p[2];
        const n = parseFloat(p.slice(3).join('.'));
        return { type, n };
    };
    const pa = getParts(a);
    const pb = getParts(b);
    if (pa.type !== pb.type) return pa.type.localeCompare(pb.type);
    return pa.n - pb.n;
});

sortedKeys.forEach(key => {
    defsString += `  ${key}: ${definitions.get(key)};\n`;
});

// Insert definitions
const result = newLines.join('\n').replace(/\/\/ \[here\]/, `// [here]\n${defsString}`);

fs.writeFileSync(FILE_PATH, result);
console.log('Refactoring complete.');
console.log('Variables created:', definitions.size);
