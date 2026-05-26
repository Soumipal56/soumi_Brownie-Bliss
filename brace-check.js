const fs = require('fs');
const content = fs.readFileSync('api/index.js', 'utf8');
let stack = [];
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let inString = false;
  let strChar = '';
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if ((char === '\'' || char === '"' || char === '`') && line[j-1] !== '\\') {
      if (!inString) { inString = true; strChar = char; }
      else if (strChar === char) { inString = false; }
    }
    if (!inString && line.substring(j, j+2) === '//') break;
    
    if (!inString) {
      if (char === '{') stack.push(i + 1);
      else if (char === '}') stack.pop();
    }
  }
}
console.log('Unmatched { at lines:', stack);
