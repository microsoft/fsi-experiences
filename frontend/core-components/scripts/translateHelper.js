'use strict';

const fs = require('fs');
const path = require('path');
const resx = require('resx');
const util = require('util');
const flatten = require('lodash').flatten;

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const pcfName = process.cwd().split('\\').pop();
const translationFiles = process.argv.slice(2);

const translationFilesToConvertIntoResx = new Set([pcfName, ...translationFiles]);

const jsonsRootFolder = path.join(__dirname, '../assets/strings');

const createResx = async () => {
    const translationDirs = fs
        .readdirSync(jsonsRootFolder, { withFileTypes: true })
        .filter(({ name }) => translationFilesToConvertIntoResx.has(name));

    const translationDirsPromises = [{ name: 'common' }, ...translationDirs]
        .map(({ name }) => ({
            path: path.resolve(`${jsonsRootFolder}/${name}`),
            name,
        }))
        .map(({ path }) => readDir(path));

    const allTranslations = await Promise.all(translationDirsPromises);

    // This is for dev because only 1033 is available and the rest is missing in dev env
    const languages = { 1036: [], 1043: [], 1031: [], 1040: [], 3082: [] , 1028: [], 1046: []};
    const forceAdditionalCodesObject = process.env.npm_config_isDev ? languages : {};

    const languageMap = flatten(allTranslations).reduce((prevValue, currValue) => {
        const [name, languageCode] = currValue.split('.');
        return { ...prevValue, [languageCode]: [...(prevValue[languageCode] || []), path.resolve(`${jsonsRootFolder}/${name}/${currValue}`)] };
    }, forceAdditionalCodesObject);

    Object.keys(languageMap).forEach(async languageCode => {
        const jsonsData = await Promise.all(languageMap[languageCode].map(path => readFile(path, 'utf8')));

        const mergedJson = jsonsData.reduce((prevValue, currValue) => ({ ...prevValue, ...JSON.parse(currValue) }), {});

        resx.js2resx(mergedJson, (resxErr, res) => {
            if (resxErr) {
                console.error(`${pcfName} - resx lib couldn't convert json to resx`, resxErr);
                process.exit(1);
            }

            const stringsDir = path.join(process.cwd(), `./${pcfName}/strings`);

            if (!fs.existsSync(stringsDir)) {
                fs.mkdirSync(stringsDir, { recursive: true });
            }

            fs.writeFile(path.join(stringsDir, `./${pcfName}.${languageCode}.resx`), res, err => {
                if (err) {
                    console.error(`Error happened while writing ${pcfName}.${languageCode}.resx`, err);
                } else {
                    console.log(`${pcfName}.${languageCode}.resx was saved`);
                }
            });
        });
    });
};

createResx();
