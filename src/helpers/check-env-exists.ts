import chalkTemplate from 'chalk-template';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';
import { availableEnvs, env, envFolder } from './defaults.js';
import { log } from './log-to-console.js';


export function checkEnvExists() {
  const envFilePath = join(process.cwd(), envFolder, `${env}.json`);
  if (!existsSync(envFilePath)) {
    log(chalkTemplate`
{red  ⚠️⚠️⚠️ Environment file for environment {white ${env}} not found ⚠️⚠️⚠️ }

Huppeldepup failed to read the file {green ${envFolder}/${env}.json}
available environments are:
    {yellow ${availableEnvs.join('\n   ')}}
  `);
    process.exit(1);
  }
}

export function checkEnviromentFolderExists() {
  return new Promise((resolve) => {
    const envPath = join(process.cwd(), envFolder);

    if (!existsSync(envPath)) {
      const rl = createInterface({
        input: process.stdin,
        output: process.stdout
      });
      console.log(chalkTemplate`
{red  ⚠️⚠️⚠️ Environments folder {white ${envFolder}} does not exist ⚠️⚠️⚠️ }

  Do you want that Huppeldepup create:
    the folder {green ${envFolder}}
    and the files {green ${envFolder}/dev.json} and {green ${envFolder}/prod.json}`);
      rl.question(`for you? (Y/n)`, (answer) => {
        if (answer !== 'Y' && answer !== 'y') { process.exit(1); }
        mkdirSync(envPath, { recursive: true });
        writeFileSync(join(envPath, `prod.json`), JSON.stringify({ production: true }, undefined, 2));
        writeFileSync(join(envPath, `dev.json`), JSON.stringify({ production: false }, undefined, 2));
        rl.close();
        resolve(undefined);
      })
    }
    else { resolve(undefined); }
  });
}

