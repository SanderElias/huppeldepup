import chalkTemplate from 'chalk-template';
import { join } from 'path';
import { inspect } from 'util';
import { defaultFileContents, env, envFolder, envVar } from './defaults.js';
import { log } from './log-to-console.js';


export async function createContentFromJson() {

  const folder = join(process.cwd(), envFolder);
  try {
    const { default: usedEnv } = await import(`${folder}/${env}.json`, { assert: { type: 'json' } });
    usedEnv[envVar] = env;
    const strRep = inspect(usedEnv, { depth: Infinity, compact: false, breakLength: 80, maxArrayLength: Infinity, maxStringLength: Infinity, sorted: true, getters: true, showHidden: true, showProxy: true, });
    return defaultFileContents.replace('/** placeholder */', strRep);

  } catch (e:any) {
    log(chalkTemplate`
{red  ⚠️⚠️⚠️ Error while creating environment {white ${env}} ⚠️⚠️⚠️ }


   {white  ${e.message} }

`);
    process.exit(1);
  }
}
