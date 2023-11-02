const yaml = require('yamljs');
const fs = require('fs');
const path = require('path');

const gitignore = () => {
    const configPath = path.join('.onboard', 'config.yaml');
    const gitignorePath = path.join('.gitignore');
    const sectionComment = '# Files part of onboarding process that should be excluded';

    if (fs.existsSync(configPath)) {
        // Load the YAML configuration
        const config = yaml.load(configPath);

        // Get the output paths from the configuration
        const outputPaths = config.files.map(file => file.output);

        // Read the existing .gitignore file, if it exists
        let gitignoreContent = '';
        if (fs.existsSync(gitignorePath)) {
            gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        }

        // Check if the section already exists
        let hasSection = gitignoreContent.includes(sectionComment);

        // Prepare the new .gitignore content
        let newGitignoreContent = hasSection ? gitignoreContent : `${gitignoreContent}\n\n${sectionComment}\n`;

        // Append new paths to the section
        let hasChanges = false;
        outputPaths.forEach(outputPath => {
            if (!newGitignoreContent.includes(outputPath)) {
                if (hasSection) {
                    // Find the section and append within it
                    const sectionIndex = newGitignoreContent.indexOf(sectionComment) + sectionComment.length;
                    const beforeSection = newGitignoreContent.substring(0, sectionIndex);
                    const afterSection = newGitignoreContent.substring(sectionIndex);
                    newGitignoreContent = `${beforeSection}\n${outputPath}${afterSection}`;
                } else {
                    // Simply append to the end
                    newGitignoreContent += `${outputPath}\n`;
                }
                hasChanges = true;
            }
        });

        // Write the changes to the .gitignore file, if any new paths were added
        if (hasChanges) {
            fs.writeFileSync(gitignorePath, newGitignoreContent.trim() + '\n'); // Trim and ensure there's a newline at the end
            console.log('.gitignore updated successfully.');
        } else {
            console.log('No updates needed for .gitignore.');
        }
    } else {
        console.error('config.yaml not found in .onboard directory. Exiting.');
        process.exit(1);
    }
};

module.exports = gitignore;
