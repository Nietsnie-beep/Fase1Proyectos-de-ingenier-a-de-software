import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'processed_files_act3'); // El directorio de archivos HTML procesados.
const outputFile = 'consolidated_words.txt';
const logFile = 'a4_matricula.txt';
let logContent = "";

// Inicia el cronómetro para el registro de tiempo total
const startTotalTime = performance.now();

const wordSet = new Set();

// Lee todos los archivos en el directorio especificado
const files = fs.readdirSync(directoryPath);
files.forEach(file => {
  if (path.extname(file) === '.html') {
    const startReadTime = performance.now(); // Inicia cronómetro para leer archivo

    const content = fs.readFileSync(path.join(directoryPath, file), 'utf8');
    const words = content.match(/\b[\w']+\b/g);
    if (words) {
      words.map(word => word.toLowerCase()).forEach(word => wordSet.add(word));
    }

    const endReadTime = performance.now(); // Detiene cronómetro para leer archivo
    const timeTaken = (endReadTime - startReadTime).toFixed(2);
    logContent += `Time to process ${file}: ${timeTaken}ms\n`; // Añade el tiempo de cada archivo al contenido del log
    console.log(`⏰ Time to read and process ${file}: ${timeTaken}ms`);
  }
});

const sortedWords = Array.from(wordSet).sort();

fs.writeFileSync(outputFile, sortedWords.join('\n'));

const endTotalTime = performance.now();

// Añade el tiempo total al contenido del log
logContent += `Total Time to process and sort words: ${((endTotalTime - startTotalTime) / 1000).toFixed(2)}s`;

fs.writeFileSync(logFile, logContent);

console.log(`📄 Word consolidation and sorting complete. Total processing time: ${((endTotalTime - startTotalTime) / 1000).toFixed(2)}s`);
