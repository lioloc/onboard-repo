#!/usr/bin/env node

const yargs = require('yargs');

const init = require('./commands/init');
const run = require('./commands/run');
const gitignore = require('./commands/gitignore');

yargs
    .command('init', 'Initialize onboard', {}, init)
    .command('run', 'Run the onboarding strategy at the current project', {}, run)
    .command('gitignore', 'Add files in onboard folder to gitignore file', {}, gitignore)
    .demandCommand(1, 'Please specify a command')
    .help()
    .argv;
