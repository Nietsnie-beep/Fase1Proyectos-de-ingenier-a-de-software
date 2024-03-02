import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

const inputDirectory = process.argv[2];
const outputDirectory = process.argv[3];
const dictionaryFile = path.join(outputDirectory, 'dictionary.txt');
const logFile = path.join(outputDirectory, 'a6_matricula.txt');

if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
}

const startTotalTime = performance.now();
let wordDictionary = {};

const files = fs.readdirSync(inputDirectory);
files.forEach(file => {
    const filePath = path.join(inputDirectory, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const words = content.match(/\b[\w']+\b/g) || [];

    words.forEach(word => {
        word = word.toLowerCase();
        if (!wordDictionary[word]) {
            wordDictionary[word] = { count: 0, files: new Set() };
        } else if (!wordDictionary[word].files) { // Verificación adicional por precaución
            console.error(`El conjunto 'files' no está definido para la palabra: ${word}`);
            wordDictionary[word].files = new Set(); // Inicialización de emergencia
        }
        wordDictionary[word].files.add(file);
        wordDictionary[word].count += 1;
    });
});

let dictionaryContent = "Token;Repeticiones;# de archivos con ese token\n";
for (const [word, data] of Object.entries(wordDictionary)) {
    dictionaryContent += `${word};${data.count};${data.files.size}\n`;
}

fs.writeFileSync(dictionaryFile, dictionaryContent);

const endTotalTime = performance.now();
const totalTime = ((endTotalTime - startTotalTime) / 1000).toFixed(2);
let logContent = `Tiempo total de procesamiento: ${totalTime}s\n`;
fs.writeFileSync(logFile, logContent);

console.log(`Procesamiento completo. Tiempo total: ${totalTime}s`);
    