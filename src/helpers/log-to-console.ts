import { beQuiet } from './defaults.js';

export function log(...args: any[]) {
  if (!beQuiet) {
    console.log(...args);
  }
}
