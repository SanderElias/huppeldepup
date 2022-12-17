import chalkTemplate from 'chalk-template';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { center } from './center.js';
import { createContentFromJson } from './createContentfromJson.js';
import { env, envFolder, fileName, outputPath, useDefault, welcome } from './defaults.js';
import { usesDefaultWarn } from './usesDefaultWarn.js';

console.log(chalkTemplate`
{black {bgGreen  ${center(welcome)} }}`)

usesDefaultWarn(useDefault);

console.log(chalkTemplate`
Using environment: {green ${env}}
read from        : {green ./${envFolder}/${env}.json}
`)

const outFilePath = join(process.cwd(), outputPath);
if (!existsSync(outFilePath)) {
  mkdirSync(outFilePath, { recursive: true });
}
const fileContent = await createContentFromJson();
writeFileSync(join(outFilePath, fileName), fileContent);




