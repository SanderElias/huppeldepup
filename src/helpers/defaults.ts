import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import yargs from 'yargs';

const arg: any = yargs(process.argv.slice(2)).options({
  env: { type: 'string', alias: 'e', default: undefined, description: 'The environment to use' },
  envVar: { type: 'string', alias: 'v', default: 'ANGULAR_ENV', description: 'The name of the environment variable to use' },
  envFolder: { type: 'string', alias: 'f', default: 'environments', description: 'The folder containing the environment files to read' },
  outputPath: { type: 'string', alias: 'o', default: 'src/environments', description: 'The folder to write the environment file to' },
  fileName: { type: 'string', alias: 'n', default: 'environment.ts', description: 'The name of the file to write' },
  templateFile: { type: 'string', default: 'environment/template.ts', description: 'The name of the template file to use' },
  beQuiet: { type: 'boolean', default: false, description: 'Suppress all output' },
}).argv;

export const envVar = arg.envVar
export const envFolder = arg.envFolder;
export const outputPath = arg.outputPath;
export const fileName = arg.fileName;
export const beQuiet = arg.beQuiet;

export const setByCmdLine = typeof arg.env === 'string' && arg.env !== '';
export const setByEnvVar = !setByCmdLine && process.env[envVar] !== undefined;
/** boolean indicating env variable is not set */
export const isEnvSet = setByCmdLine || setByEnvVar;
/** the var containing the environment */
export const env =
  setByCmdLine ? arg.env :
    setByEnvVar ? process.env[envVar] :
      'prod';

/** welcome string */
export const welcome = '❤️❤️❤️ Huppeldepup CLI, the missing link! ❤️❤️❤️';

try {
  const { default: defaultFileContents } = await import(arg.templateFile, { assert: { type: 'json' } });
} catch {

}

let tplContent = `
// This file is generated by the Huppeldepup CLI.

export const environment = /** placeholder */;

`
const templateFile = join(process.cwd(), arg.templateFile);
if (existsSync(templateFile)) {
  try {
    tplContent = readFileSync(templateFile, 'utf-8').toString();
  } catch { }
}

export const defaultFileContents = tplContent;

export const defaultContent = {
  production: true
} as const;



export const availableEnvs = getEnvs();


export function getEnvs() {
  const envPath = join(process.cwd(), envFolder);
  if (!existsSync(envPath)) {
    return [];
  }
  const envs = readdirSync(envPath)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
  return envs;
}
