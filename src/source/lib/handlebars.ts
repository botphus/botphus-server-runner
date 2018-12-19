import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as helpers from 'handlebars-helpers';
import * as path from 'path';
import * as recursive from 'recursive-readdir';

// handlebars template path
const tmplDirPath = path.join(__dirname, '../../../template/');
const partialDirPath = path.join(tmplDirPath, 'partials'); // partial dir path
const entryFilePath = path.join(tmplDirPath, 'index.js'); // entry file path

let templateCache: Handlebars.TemplateDelegate;

// Register helpers
helpers({
    handlebars
});

/**
 * Register Partials from dir path
 * @param {string} dir Directory Path
 */
/**
 * Register Partials from dir path
 * @param  {string}        dir Directory Path
 * @return {Promise<void>}     Promise
 */
function registerPartials(dir: string): Promise<void> {
    return recursive(dir)
        .then((files) => {
            files.forEach((filePath) => {
                handlebars.registerPartial(path.basename(filePath, '.js'), fs.readFileSync(filePath, 'utf8'));
            });
        });
}

/**
 * handlebars template function
 * @return {Promise<Handlebars.TemplateDelegate>} Template function promise
 */
export function template(): Promise<Handlebars.TemplateDelegate> {
    // if has cache return;
    if (templateCache) {
        return Promise.resolve(templateCache);
    }
    // else compile template;
    return registerPartials(partialDirPath)
        .then(() => {
            templateCache = handlebars.compile(fs.readFileSync(entryFilePath, 'utf8'));
            return Promise.resolve(templateCache);
        });
}
