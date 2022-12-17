import chalkTemplate from 'chalk-template';
import { envVar } from "./defaults.js";

export function usesDefaultWarn(useDefault: boolean) {
  if (useDefault) {
    console.log(chalkTemplate`
{red  ⚠️⚠️⚠️ Using default environment ⚠️⚠️⚠️ }

You can set the environment by setting the {green ${envVar}} environment variable.`);
  }
}
