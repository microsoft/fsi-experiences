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

const filesByProjects = translationFiles.map(tf => {
    const split = tf.split('=');
    const project = split[0];
    return {
        project,
        folder: path.join(__dirname, `../../modules/${project}/assets/strings`),
        names:split[1].split(',')
    }
})
filesByProjects.unshift({
    project: '@fsi/core-components',
    folder: path.join(__dirname, '../../core-components/assets/strings'),
    names: ['common']
})

const commonRootFolder = path.join(__dirname, '../../core-components/assets/strings/');

const createResx = async () => {

    const translationDirs = filesByProjects.reduce((allDirs, filesByProject) => {
        const filesToConvert = new Set(filesByProject.names);
        const dirs = fs.readdirSync(path.resolve(filesByProject.folder), { withFileTypes: true }).filter(({ name }) => filesToConvert.has(name));
        const resolvedDirs = dirs.map(({name}) => path.resolve(`${filesByProject.folder}/${name}`))
        return allDirs.concat(resolvedDirs);

    }, []);
    const translationDirsPromises = translationDirs.map((dir) => readDir(dir).then(files => files.map(f => path.join(dir, f))));

    const allTranslations = await Promise.all(translationDirsPromises);

    // This is for dev because only 1033 is available and the rest is missing in dev env
    const languages = { 1036: [], 1043: [], 1031: [], 1040: [], 3082: [] , 1028: [], 1046: []};
    const forceAdditionalCodesObject = process.env.npm_config_isDev ? languages : {};

    const languageMap = flatten(allTranslations).reduce((prevValue, currValue) => {
        const [name, languageCode] = currValue.replace(path.dirname(currValue), '').split('.');
        return { ...prevValue, [languageCode]: [...(prevValue[languageCode] || []), currValue] };
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
