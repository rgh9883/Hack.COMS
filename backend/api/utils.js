import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function executeSQLFile(filePath, db) {
    try {
        // Read SQL file
        const sql = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
        console.log(sql)
        // Execute SQL commands
        const [result] = db.query(sql);
        console.log('SQL file executed successfully:', result);
      } catch (error) {
        console.error('Error executing SQL file:', error);
      }
}