import { basename } from 'path';
import * as yargs from 'yargs';
import { cmdWelcome } from './cmdWelcome';

// Get real executable name for pkg
const executable: string = basename(__filename);

// Yargs: make options
let options = yargs
  .usage(`Usage: ${executable} <command> [options]`)
  .command('welcome', 'Welcome message')
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
} else {
  yargs.showHelp();
  console.log('Invalid command');
}
