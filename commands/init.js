const yaml = require('yamljs');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const init = () => {
    const onboardDir = path.join('.onboard');
    const filesDir = path.join('.onboard', 'files'); // Path for the files directory

    let isNewInstallation = false;

    // Create the .onboard directory if it doesn't exist
    if (!fs.existsSync(onboardDir)) {
        mkdirp.sync(onboardDir);
        isNewInstallation = true;
    }

    // Create the files directory if it doesn't exist
    if (!fs.existsSync(filesDir)) {
        mkdirp.sync(filesDir);
        isNewInstallation = true;
    }

    // Only create the default config if this is a new installation
    if (isNewInstallation) {
        const defaultConfig = {
            files: []
        };

        fs.writeFileSync(path.join(onboardDir, 'config.yaml'), yaml.stringify(defaultConfig, 4));
        console.log('Created .onboard/config.yaml with default configuration.');

        // Inform the user that a files folder has been created
        console.log('Created .onboard/files folder.');
    } else if (!isNewInstallation) {
        console.error('Initialization aborted: .onboard directory and/or files folder already exists.');
    }
};

module.exports = init;
