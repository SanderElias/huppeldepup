import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { outputPath, fileName } from './defaults.js';
import { createContentFromJson } from './create-content-from-json.js';


export async function write() {

  const outFilePath = join(process.cwd(), outputPath);
  if (!existsSync(outFilePath) && await askUser()) {
    mkdirSync(outFilePath, { recursive: true });
  }
  const fileContent = await createContentFromJson();
  const outFileName = join(outFilePath, fileName);
  writeFileSync(join(outFilePath, fileName), fileContent);
}


async function askUser() {
  return true;
}
