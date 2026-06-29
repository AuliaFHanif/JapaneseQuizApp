const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'app', 'QuestionBank.js');
const outputDir = path.join(__dirname, '..', 'app', 'data');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Reading QuestionBank.js...');
const rawData = fs.readFileSync(inputPath, 'utf8');

// Parse the JSON array from the file
let jsonString = rawData.replace('const questionData = ', '').trim();
if (jsonString.endsWith(';')) {
    jsonString = jsonString.slice(0, -1);
}

console.log('Parsing JSON...');
const data = JSON.parse(jsonString);

console.log(`Successfully parsed ${data.length} records. Chunking data...`);

const chunks = {};

data.forEach(item => {
    const level = item.level || 'Unclassified';
    const category = item.category || 'unknown';
    const key = `${level}_${category}s`; // e.g., N5_nouns
    
    if (!chunks[key]) {
        chunks[key] = [];
    }
    chunks[key].push(item);
});

console.log(`Writing chunks to ${outputDir}...`);

Object.keys(chunks).forEach(key => {
    const filename = `questionData_${key}.js`;
    const outputPath = path.join(outputDir, filename);
    // Write out a JS file that assigns the array to a global window variable
    const content = `window.questionData_${key} = ${JSON.stringify(chunks[key], null, 2)};\n`;
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`Created ${filename} with ${chunks[key].length} records.`);
});

console.log('Chunking complete!');
