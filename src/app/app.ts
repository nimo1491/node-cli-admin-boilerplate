import { basename } from 'path';
import * as yargs from 'yargs';
import { cmdWelcome } from './cmdWelcome';
import { cmdManage } from './cmdManage';

// Get real executable name for pkg
const executable: string = basename(__filename);

// Yargs: make options
let options = yargs
  .usage(`Usage: ${executable} <command> [options]`)
  .command('welcome', 'Welcome message')
  .command('manage', 'Manage multiple nodes')
  .demandCommand(1, 'Must provide a valid command')
  .epilog('Copyright Year Company/Author')
  .argv;

const command: string = options._[0];
if (command === 'welcome') {
  options = yargs
  .reset()
  .usage(`Usage: ${executable} welcome [options]`)
  .option('b', {
    alias: 'bg',
    describe: 'Demo different background color',
  })
  .example(`${executable} welcome`, 'Show welcome message')
  .example(`${executable} welcome -b`, 'Another welcome message')
  .options('h', {
    alias: 'help',
    describe: 'Show help',
    global: false,
  })
  .epilog('Copyright Year Company/Author')
  .argv;

  // Make help usage manually since I don't want type string
  if (options.h) {
    yargs.showHelp();
  } else {
    cmdWelcome(options);
  }
} else if (command === 'manage') {
  options = yargs
  .reset()
  .usage(`Usage: ${executable} manage [options]`)
  .example(`${executable} session`, 'Go to management console')
  .options('h', {
    alias: 'help',
    describe: 'Show help',
    global: false,
  })
  .epilog('Copyright Year Company/Author')
  .argv;

  // Make help usage manually since I don't want type string
  if (options.h) {
    yargs.showHelp();
  } else {
    cmdManage();
  }
} else {
  yargs.showHelp();
  console.log('Invalid command');
}
