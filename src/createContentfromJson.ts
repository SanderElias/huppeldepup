import chalkTemplate from 'chalk-template';
import { env, envFolder, envVar, defaultFileContents } from './defaults.js';
import { inspect } from 'util';
import { join } from 'path';

export async function createContentFromJson() {

  const folder = join(process.cwd(), envFolder);
  try {
    const { default: usedEnv } = await import(`${folder}/${env}.json`, { assert: { type: 'json' } });
    const strRep = inspect(usedEnv, { depth: Infinity, compact: false, breakLength: 80, maxArrayLength: Infinity, maxStringLength: Infinity, sorted: true, getters: true, showHidden: true, showProxy: true, });
    return defaultFileContents.replace('/** placeholder */', strRep);

  } catch {
    console.log(chalkTemplate`
    {red  ⚠️⚠️⚠️ Environment file not found ⚠️⚠️⚠️ }

    You can set the environment by setting the {green ${envVar}} environment variable.`);
    process.exit(1);
  }
}
