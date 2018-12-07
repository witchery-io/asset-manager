# AssetManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Short - Run `ng g c ex. [m, s]`

## Build

**Important**
Use for prod server following command `ng build --aot  --build-optimizer --prod` 
  
Run `ng build` to build the project.
The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build.
User the `--stats-json` flag CLI will generate a stats.json file in the dist with our bundles. 
This stats file has all kinds of useful data about our application bundles.

## Webpack
You can use webpack bundle analyzer.

**To use this tool use the following steps**
- Install via npm to your CLI project: `npm install --save-dev webpack-bundle-analyzer`
- Once installed add the following entry to the npm scripts in the `package.json`: `"bundle-report": "webpack-bundle-analyzer dist/stats.json"`
- Once added run the following command: `npm run bundle-report`


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Optimize Run Project in Production

