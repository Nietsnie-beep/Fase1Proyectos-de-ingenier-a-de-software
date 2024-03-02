// timeLogger.js
import fs from 'fs';
import path from 'path';

const logFilePath = path.join('./', 'a1_02982380.txt'); // Archivo de registro

// Sobrescribir (o crear) el archivo de registro al inicio
fs.writeFileSync(logFilePath, '');

export function startTimer() {
    return process.hrtime();
}

export function endTimer(startTime) {
    const endTime = process.hrtime(startTime);
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000; // Convertir a milisegundos
    return timeTaken;
}

export function logTime(file, timeTaken) {
    const logMessage = `🕰️ ${file}: ${timeTaken.toFixed(3)} ms\n`;
    console.log(logMessage);
    fs.appendFileSync(logFilePath, logMessage);
}

export function logTotalTime(totalTime, message = 'Tiempo total de procesamiento') {
    const totalLogMessage = `${message}: ${totalTime.toFixed(3)} ms\n`;
    console.log(totalLogMessage);
    fs.appendFileSync(logFilePath, totalLogMessage);
}
