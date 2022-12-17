import chalk from 'chalk'
import chalkTemplate from 'chalk-template';
import { center } from './center.js';
import { usesDefaultWarn } from './usesDefaultWarn.js';
import { welcome, useDefault, env, envFolder } from './defaults.js';

console.log(chalkTemplate`
{black {bgGreen  ${center(welcome)} }}`)

usesDefaultWarn(useDefault);

console.log(chalkTemplate`
Using environment: {green ${env}}
read from        : {green ./${envFolder}/${env}.json}
`)




