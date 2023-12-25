'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const bundlePlaceholder = '{{bundlePlaceholder}}';
const bundleMapPlaceholder = '{{bundleMapPlaceholder}}';

async function runBundleUpdate() {
    console.log('start update bundle on data xml');
    if (!process.argv[3]) {
        console.error('No input params');
        process.exit(1);
    }

    const portalDirectory = process.argv[2];
    const bundlePathTemplate = `../../portals/${portalDirectory}/build/bundle.js`;
    const bundlePath = path.resolve(__dirname, bundlePathTemplate);
    console.log(`bundlePath: ${bundlePath}`);
    const bundleMapPath = bundlePath + '.map';
    console.log(`bundleMapPath: ${bundleMapPath}`);
    const dataXmlDirectory = process.argv[3];
    const dataXmlPathTemplate = `../../../Modules/${dataXmlDirectory}/${dataXmlDirectory}.Package/${dataXmlDirectory}/ConfigData/**/data.xml`;
    const dataXmlPath = path.resolve(__dirname, dataXmlPathTemplate);
    console.log(`dataXmlPath: ${dataXmlPath}`);

    const bundleBase64 = getBase64(bundlePath);
    const bundleMapBase64 = getBase64(bundleMapPath);
    const files = await getAllFiles(dataXmlPath);

    await updateAllDataXml(files, bundleBase64, bundleMapBase64);
    console.log(`Finish updating ${files.length} files`);
}

function getBase64(bundlePath) {
    const bundleFile = fs.readFileSync(bundlePath, 'utf8');
    const bundleBuffer = new Buffer.from(bundleFile, 'utf8');
    const bundleBase64 = bundleBuffer.toString('base64');
    return bundleBase64;
}

function getDataXml(dataXmlPath) {
    const dataXml = fs.readFileSync(dataXmlPath, 'utf8');
    return dataXml;
}

function getAllFiles(dataXmlPath) {
    return new Promise((resolve, reject) => {
        glob(dataXmlPath, async (er, files) => {
            return er ? reject(err) : resolve(files);
        });
    });
}

async function updateAllDataXml(files, bundleBase64, bundleMapBase64) {
    for (let i = 0; i < files.length; i++) {
        const dataXml = getDataXml(files[i]);
        await updateDataXml(files[i], dataXml, bundleBase64, bundleMapBase64);
        console.log(`data xml was updated`);
    }
}
function updateDataXml(dataXmlPath, dataXml, bundleBase64, bundleMapBase64) {
    return new Promise((resolve, reject) => {
        if (!dataXml.includes(bundleBase64) || !dataXml.includes(bundleMapBase64)) {
            console.log(`Didnt find placeholders in ${dataXmlPath}`);
        }
        fs.writeFile(
            dataXmlPath,
            dataXml.replace(bundlePlaceholder, bundleBase64).replace(bundleMapPlaceholder, bundleMapBase64),
            { encoding: 'utf8' },
            () => resolve(dataXmlPath)
        );
    });
}

runBundleUpdate();
