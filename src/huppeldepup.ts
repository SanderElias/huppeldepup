#! /usr/bin/env node

import chalkTemplate from 'chalk-template';
import { center } from './helpers/center.js';
import { checkEnvExists } from './helpers/check-env-exists.js';
import { env, envFolder, fileName, isEnvSet, outputPath, welcome } from './helpers/defaults.js';
import { log } from './helpers/log-to-console.js';
import { usesDefaultWarn } from './helpers/uses-default-warn.js';
import { write } from './helpers/write.js';

log(chalkTemplate`
{black {bgGreen  ${center(welcome)} }}`)

usesDefaultWarn(isEnvSet);
checkEnvExists();

write();

log(chalkTemplate`
Using environment: {green ${env}}
read from        : {green ./${envFolder}/${env}.json}
Written to file  : {green ./${outputPath}/${fileName}}
`)



