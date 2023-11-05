const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const ejs = require('ejs');
const dotenv = require('dotenv');

const run = () => {
    // Parse .env file to an object
    const envVariables = dotenv.config().parsed;

    // Load config.yaml
    const config = yaml.load(path.join('.onboard', 'config.yaml'));

    // Process each file definition
    config.files.forEach(fileConfig => {
        const templateContent = fs.readFileSync(fileConfig.input, 'utf8');
        const variables = {};

        // Prepare variables object for EJS rendering
        fileConfig.variables.forEach(variable => {
            const value = envVariables[variable.name];
            if (value === undefined) {
                console.error(`Environment variable ${variable.name} not found in .env`);
                process.exit(1);
            }
            variables[variable.name] = value;
        });

        // Render EJS template with variables
        const renderedContent = ejs.render(templateContent, variables);

        // Ensure the output directory exists
        const outputDir = path.dirname(fileConfig.output);
        fs.mkdirSync(outputDir, { recursive: true });

        // Write the rendered content to the specified output location
        fs.writeFileSync(fileConfig.output, renderedContent);
        console.log(`File generated: ${fileConfig.output}`);
    });
};

module.exports = run;
