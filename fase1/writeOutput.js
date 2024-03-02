// writeOutput.js
import fs from 'fs';

export const writeToFile = (filePath, content) => {
    fs.writeFileSync(filePath, content, 'utf8');
};
