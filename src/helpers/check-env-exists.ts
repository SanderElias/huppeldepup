import chalkTemplate from 'chalk-template';
import { existsSync } from 'node:fs';
import { join } from 'path';
import { availableEnvs, env, envFolder, outputPath } from './defaults.js';
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
