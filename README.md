# ❤️❤️❤️ Huppeldepup CLI, the missing link! ❤️❤️❤️

The Huppeldepup CLI is a command line interface to solve the missing link between
environment variables and your [Angular](https://angular.io/) applicationS.

> ***NOTE***: This is a replacement system for using the `fileReplacements` option in the `angular.json` file. This is a more flexible solution. It works in a similar way as the `fileReplacements` option. However, it will replace the file _before_ the angular build process starts.

When you run your Angular application in different environments, you usually have to change the code to adapt to the environment. With the Huppeldepup CLI you can use an environment variable to select the environment for your application. This way you can easily switch between environments without changing the code, or the build process. This means it becomes easier to deploy your application to different environments.

By default the Huppeldepup CLI will look for an environment variable called `ANGULAR_ENV` and use the value of that variable to select the environment. You can change the name of the environment variable with the `--envVar` option.

> ***NOTE***: Huppeldepup will add `ANGULAR_ENV` with the selected environment to the environment data found in your `.json` file. This way you can use the environment variable in your application.

Then it will look for a JSON file with the name of the environment variable in the `./environments` folder. If it finds a file with that name, it will read the contents. 

> ***NOTE***: The file must be a valid JSON file. The file extension must be `.json`.

The template is a TypeScript file that exports an object with the environment variables. The default template is embedded in the code. You can change the template with the `--templateFile` option. Then it read this file and  replace the string `/** placeholder */` in the template with the variables found in the JSON file. 

Finally it will write the result to the file `./src/environments/environment.ts`. You can change the output path and file name with the `--outputPath` and `--fileName` options.

## 🚀 Getting started

### Installation

The package is available on [npm](https://www.npmjs.com/package/@se-ng/huppeldepup).

for an global installation run:

```bash
npm install -g @se-ng/huppeldepup
```
You can also install it locally to your project:

```bash
npm install --save-dev @se-ng/huppeldepup
```

### Usage

set the environment variable `ANGULAR_ENV` to the environment you want to use.
create a folder `./environments` in your project root and create a file for each environment you want to use.

Then update your `package.json` to run `huppeldepup` before your `ng` commands.
similar to this example:

```json
"scripts": {
    "huppeldepup": "huppeldepup",
    "prestart": "huppeldepup",
    "prebuild": "huppeldepup",
    "prewatch": "huppeldepup",
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
```

You can now run `npm start` or `npm run watch` to start your application with the environment you set in `ANGULAR_ENV`.

## Options
### Overview of all comman line options

| option         | meaning                                     | default                    | short |
| -------------- | ------------------------------------------- | -------------------------- | ----- |
| --env          | The environment to use                      | _unset_                    | -e    |
| --envVar       | The name of the environment variable        | `ANGULAR_ENV`              | -v    |
| --envFolder    | The folder containing the environment files | `./environments`           | -f    |
| --outputPath   | The folder to write the environment to      | `./src/environments`       | -o    |
| --fileName     | The name of the file to write               | `environment.ts`           | -n    |
| --templateFile | The name of the template                    | `environments/template.ts` |       |
| --beQuiet      | Suppress all output                         | false                      |       |
| --help         | Show help                                   |                            |       |
| --version      | Show version number                         |                            |       |

### `--env`

You can also set the environment variable directly with the `--env` option.
this will take precedence over the `ANGULAR_ENV` variable.

```bash
npm run huppeldepup --env=development
```

### `--templateFile`

This option allows you to use a custom template file. The template file must be a valid TypeScript file. The file extension must be `.ts`. The template file must contain the exact  string `/** placeholder */` somewhere in the file. Huppeldepup will fail when the placeholder is missing or misspelled. This is where the environment variables will be inserted. The default template is embedded in the code. 
it looks like this:

```typescript
// This file is generated by the Huppeldepup CLI.

export const environment = /** placeholder */;

```
