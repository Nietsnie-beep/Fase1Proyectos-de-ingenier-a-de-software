import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

// Asumiendo que los directorios de entrada y salida se pasan como argumentos de línea de comandos
const inputDirectory = process.argv[2];
const outputDirectory = process.argv[3];
const outputFile = path.join(outputDirectory, 'consolidated_words.txt');
const outputFileByFrequency = path.join(outputDirectory, 'words_by_frequency.txt');
const logFile = path.join(outputDirectory, 'a5_matricula.txt');
let logContent = "";

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

const startTotalTime = performance.now();
let allWords = {};

// Lee todos los archivos en el directorio especificado
const files = fs.readdirSync(inputDirectory);
files.forEach(file => {
  const filePath = path.join(inputDirectory, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const words = content.match(/\b[\w']+\b/g) || [];

  words.map(word => word.toLowerCase()).forEach(word => {
    allWords[word] = (allWords[word] || 0) + 1;
  });
});

// Ordena las palabras alfabéticamente y escribe el archivo
const sortedWords = Object.entries(allWords).sort((a, b) => a[0].localeCompare(b[0]));
const alphabeticallySortedContent = sortedWords.map(([word, count]) => `${word}: ${count}`).join('\n');
fs.writeFileSync(outputFile, alphabeticallySortedContent);

// Imprime el contenido ordenado alfabéticamente en consola
console.log("Palabras ordenadas alfabéticamente y sus frecuencias:");
console.log(alphabeticallySortedContent);

// Ordena las palabras por frecuencia y escribe el archivo
const sortedByFrequency = Object.entries(allWords).sort((a, b) => b[1] - a[1]);
const frequencySortedContent = sortedByFrequency.map(([word, count]) => `${word}: ${count}`).join('\n');
fs.writeFileSync(outputFileByFrequency, frequencySortedContent);

// Imprime el contenido ordenado por frecuencia en consola
console.log("Palabras ordenadas por frecuencia y sus frecuencias:");
console.log(frequencySortedContent);

const endTotalTime = performance.now();

// Añade el tiempo total al contenido del log y lo escribe en el archivo
logContent = `Total Time to process: ${((endTotalTime - startTotalTime) / 1000).toFixed(2)}s`;
fs.writeFileSync(logFile, logContent);

console.log(`📄 Processing complete. Total time: ${((endTotalTime - startTotalTime) / 1000).toFixed(2)}s`);
