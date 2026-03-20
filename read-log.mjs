import fs from 'fs';
const text = fs.readFileSync('dev2.log', 'utf16le');
console.log(text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''));
