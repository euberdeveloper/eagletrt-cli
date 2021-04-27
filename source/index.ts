#!/usr/bin/env node
import * as yargs from 'yargs';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as postProcessingCommands from '@eagletrt/telemetria-postprocessing/bundled/bin/commands';
import * as codeGeneratorCommands from '@eagletrt/code-generator/bundled/bin/commands';
import * as simulatorCommands from '@eagletrt/telemetria-simulator/bundled/bin/commands';

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
            .demandCommand(1, 'You must specify a command');
    })
    .command(
        'transpile',
        codeGeneratorCommands.generateCommand.description,
        yargs => {
            yargs.options(codeGeneratorCommands.generateCommand.options);
        },
        args => {
            codeGeneratorCommands.generateCommand.handler(args);
        }
    )
    .command('virtualize', simulatorCommands.virtualizeCommand.description, yargs => {
        yargs
            .command(
                simulatorCommands.virtualizeCommand.canCommand.command,
                simulatorCommands.virtualizeCommand.canCommand.description,
                yargs => {
                    yargs.options(simulatorCommands.virtualizeCommand.canCommand.options);
                },
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                async args => {
                    await simulatorCommands.virtualizeCommand.canCommand.handler(args);
                }
            )
            .demandCommand(1, 'You must specify a command');
    })
    .command('simulate', simulatorCommands.simulateCommand.description, yargs => {
        yargs
            .command(
                simulatorCommands.simulateCommand.canCommand.command,
                simulatorCommands.simulateCommand.canCommand.description,
                yargs => {
                    yargs.options(simulatorCommands.simulateCommand.canCommand.options);
                },
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                async args => {
                    await simulatorCommands.simulateCommand.canCommand.handler(args);
                }
            )
            .command(
                simulatorCommands.simulateCommand.gpsCommand.command,
                simulatorCommands.simulateCommand.gpsCommand.description,
                yargs => {
                    yargs.options(simulatorCommands.simulateCommand.gpsCommand.options);
                },
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                async args => {
                    await simulatorCommands.simulateCommand.gpsCommand.handler(args);
                }
            )
            .command(
                simulatorCommands.simulateCommand.allCommand.command,
                simulatorCommands.simulateCommand.allCommand.description,
                yargs => {
                    yargs.options(simulatorCommands.simulateCommand.allCommand.options);
                },
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                async args => {
                    await simulatorCommands.simulateCommand.allCommand.handler(args);
                }
            )
            .demandCommand(1, 'You must specify a command');
    })
    .command(
        'settings',
        simulatorCommands.settingsCommand.description,
        yargs => {
            yargs.options(simulatorCommands.settingsCommand.options);
        },
        args => {
            simulatorCommands.settingsCommand.handler(args) as unknown;
        }
    )
    .command(
        'autocompletion',
        'Adds to your .bashrc the bash code that adds the tab autocompletion for this cli service',
        yargs => {
            yargs.options({
                'bashrc-path': {
                    describe: 'The path to the .bashrc file where the bash code will be added',
                    type: 'string',
                    alias: 'p',
                    default: path.join(os.homedir(), '.bashrc')
                },
                'src': {
                    describe: 'The path to the file containing the bash code to add to your .bashrc',
                    type: 'string',
                    alias: 's',
                    default: path.join(__dirname, 'autocompletion.txt')
                }
            });
        },
        argv => {
            const args: any = argv;
            const options = {
                bashrcPath: args.bashrcPath,
                src: args.src
            };
            const text = '\n\n' + fs.readFileSync(options.src, 'utf-8') + '\n\n';
            fs.appendFileSync(options.bashrcPath, text);
        }
    )
    .completion(
        '__generate_completion',
        'Creates the completion bash script to add o your .bashrc in order to have the tab autocompletion for this cli service',
        () => {}
    )
    .demandCommand(1, 'You must specify a command')
    .strict()
    .version(process.env.MODULE_VERSION as string)
    .epilogue('For more information, find our manual at https://github.com/eagletrt/eagle-cli#readme').argv;
