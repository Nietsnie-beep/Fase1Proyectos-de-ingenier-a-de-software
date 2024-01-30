// app.js
import fs from 'fs';
import path from 'path';
import { readHtmlFile } from './readHtmlFile.js';
import { startTimer, endTimer, logTime, logTotalTime } from './timeLogger.js';

const directoryPath = './CS13309_Archivos_HTML/Files'; // Ruta al directorio de archivos HTML


async function processHtmlFiles() {
    let totalTime = 0;
    const totalFunctionStartTime = startTimer();

    try {
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            if (file.endsWith('.html')) {
                const filePath = path.join(directoryPath, file);
                const startTime = startTimer();

                await readHtmlFile(filePath);

                const timeTaken = endTimer(startTime);
                totalTime += timeTaken;
                logTime(file, timeTaken);
            }
        }

        logTotalTime(totalTime);

        const totalFunctionTime = endTimer(totalFunctionStartTime);
        logTotalTime(totalFunctionTime, 'Tiempo total de ejecución de la función');

    } catch (error) {
        console.error('Error al leer los archivos HTML:', error);
    }
}

processHtmlFiles();
