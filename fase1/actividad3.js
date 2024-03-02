import fs from 'fs';
import path from 'path';
import { readHtmlFile } from './readHtmlFile.js';
import { removeHtmlTags, extractAndSortWords } from './processContent.js';
import { writeToFile } from './writeOutput.js';
import { startTimer, endTimer, logTime, logTotalTime } from './timeLogger.js';

const directoryPath = './CS13309_Archivos_HTML/Files'; // Ruta al directorio de archivos HTML
const outputDirectoryPath = path.join('./', 'processed_files_act3'); // Directorio para archivos procesados

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDirectoryPath)) {
    fs.mkdirSync(outputDirectoryPath);
}

// Procesar archivos HTML y registrar tiempos
async function processHtmlFiles() {
    let totalProcessingTime = 0;
    const totalFunctionStartTime = startTimer();

    try {
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            if (file.endsWith('.html')) {
                const filePath = path.join(directoryPath, file);
                const startTime = startTimer();

                const content = await readHtmlFile(filePath);
                const contentNoTags = removeHtmlTags(content);
                        
                const timeTaken = endTimer(startTime);
                totalProcessingTime += timeTaken;
                logTime(file, timeTaken);

                // Procesar contenido para extraer y ordenar palabras
                const words = extractAndSortWords(contentNoTags);
                const outputFilePath = path.join(outputDirectoryPath, `words_${file}`);
                writeToFile(outputFilePath, words.join('\n'));
            }
        }

        
        logTotalTime(totalProcessingTime); 
        const totalFunctionTime = endTimer(totalFunctionStartTime);
        logTotalTime(totalFunctionTime, 'Tiempo total de ejecución de la función');

    } catch (error) {
        console.error('⚠️Error al procesar los archivos HTML:', error);
    }
}

processHtmlFiles();
