// app.js
import fs from 'fs';
import path from 'path';
import { readHtmlFile } from './readHtmlFile.js';
import { removeHtmlTags } from './processContent.js';
import { startTimer, endTimer, logTime, logTotalTime } from './timeLogger.js';

const directoryPath = './act2_html/html_act_2'; // Ruta al directorio de archivos HTML
const outputDirectoryPath = path.join('./', 'processed_files_act2'); // Directorio para archivos procesados

// Crear el directorio de salida si no existe
if (!fs.existsSync(outputDirectoryPath)) {
    fs.mkdirSync(outputDirectoryPath);
}

async function processHtmlFiles() {
    let totalProcessingTime = 0;
    const totalStartTime = startTimer();

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

                const outputFileDirectory = path.join(outputDirectoryPath, `no_tags${file}`);
                fs.writeFileSync(outputFileDirectory, contentNoTags, 'utf8');
            }
        }

        const totalTimeTaken = endTimer(totalStartTime);
        logTotalTime(totalProcessingTime);
        logTotalTime(totalTimeTaken);

    } catch (error) {
        console.error('⚠️Error al procesar los archivos HTML:', error);
    }
}

processHtmlFiles();
