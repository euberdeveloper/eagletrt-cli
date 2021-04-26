#!/usr/bin/env node
import * as yargs from 'yargs';

import * as postProcessingCommands from '@eagletrt/telemetria-postprocessing/bundled/bin/commands';

yargs
    .scriptName('eagle')
    .command('process', 'Post process can or gps log files', yargs => {
        yargs
            .command(
                postProcessingCommands.csvCommand.command,
                postProcessingCommands.csvCommand.description,
                yargs => {
                    yargs.options(postProcessingCommands.csvCommand.options);
                },
                args => {
                    postProcessingCommands.csvCommand.handler(args);
                }
            )
            .command(
                postProcessingCommands.jsonCommand.command,
                postProcessingCommands.jsonCommand.description,
                yargs => {
                    yargs.options(postProcessingCommands.jsonCommand.options);
                },
                args => {
                    postProcessingCommands.jsonCommand.handler(args);
                }
            )
            .command(
                postProcessingCommands.testCommand.command,
                postProcessingCommands.testCommand.description,
                yargs => {
                    yargs.options(postProcessingCommands.testCommand.options);
                },
                args => {
                    postProcessingCommands.testCommand.handler(args);
                }
            )
            .demandCommand(1, 'You must specify a command for process');
    })
    .demandCommand(1, 'You must specify a command')
    .epilogue(
        'For more information, find our manual at https://github.com/euberdeveloper/eagletrt-code-generator#readme'
    ).argv;
