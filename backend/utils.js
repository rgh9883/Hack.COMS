import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function executeSQLFile(filePath, db) {
  const absolutePath = path.join(__dirname, filePath).trim();
    
    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the SQL file:', err);
            return;
        }
        db.query(data, (err, results) => {
            if (err) {
                console.error('Error executing the SQL file:', err);
                return;
            }
            console.log('SQL file executed successfully');
        });
    });
}

export { executeSQLFile };