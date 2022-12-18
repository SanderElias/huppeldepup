import chalkTemplate from 'chalk-template';
import { availableEnvs, env, envVar } from "./defaults.js";
import { log } from './log-to-console.js';

export function usesDefaultWarn(useDefault: boolean) {
  if (!useDefault) {
    log(chalkTemplate`
{red  ⚠️⚠️⚠️ Using default environment ⚠️⚠️⚠️ }

You can set the environment by setting the {green ${envVar}} environment variable.
When you get this warning, that means that:

 1. the environment variable is not set.
 2. and, you did not use the {green --env} command line option to override.

available environments are:
   {yellow ${availableEnvs.join('\n   ')}}

Huppeldepup will use the default environment: {green ${env}} and continue.
`);
  }
}
