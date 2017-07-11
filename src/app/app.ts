import { basename } from 'path';
import * as yargs from 'yargs';
import { cmdWelcome } from './command/cmdWelcome';
import { cmdManage } from './command/cmdManage';
import { cmdDiscover } from './command/cmdDiscover';
import { cmdDashboard } from './command/cmdDashboard';

// Get real executable name for pkg
const executable: string = basename(__filename);

// Bypass authentication for self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Yargs: make options
let options = yargs
  .usage(`Usage: ${executable} <command> [options]`)
  .command('welcome', 'Welcome message')
  .command('manage', 'Manage multiple nodes')
  .command('discover', 'Discover manageable nodes')
  .command('dashboard', 'Dashboard information')
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
} else if (command === 'discover') {
  options = yargs
  .reset()
  .usage(`Usage: ${executable} discover [options]`)
  .example(`${executable} discover -b 30500 -e 31500 -i http -u admin -p admin`, 'Find out all the nodes')
  .options('b', {
    alias: 'begin',
    describe: 'Beginning IP address or port number',
    require: true,
    global: false,
  })
  .options('e', {
    alias: 'end',
    describe: 'Endign IP address or port number',
    require: true,
    global: false,
  })
  .options('i', {
    alias: 'ifc',
    describe: 'Protocol',
    require: true,
    global: false,
  })
  .options('u', {
    alias: 'user',
    describe: 'Login user name',
    require: true,
    global: false,
  })
  .options('p', {
    alias: 'password',
    describe: 'Login password',
    require: true,
    global: false,
  })
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
  } else if (options.i !== 'http' && options.i !== 'https') {
    yargs.showHelp();
    console.error('Wrong protocol: only supports "http" and "https"');
  } else {
    cmdDiscover(options);
  }
} else if (command === 'dashboard') {
  options = yargs
  .reset()
  .usage(`Usage: ${executable} dashboard [options]`)
  .example(`${executable} dashboard -n 127.0.0.1:8080 -i http -u admin -p admin`, 'Get dashboard information')
  .options('n', {
    alias: 'node',
    describe: 'Node\'s URI',
    require: true,
    global: false,
  })
  .options('i', {
    alias: 'ifc',
    describe: 'Protocol',
    require: true,
    global: false,
  })
  .options('u', {
    alias: 'user',
    describe: 'Login user name',
    require: true,
    global: false,
  })
  .options('p', {
    alias: 'password',
    describe: 'Login password',
    require: true,
    global: false,
  })
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
  } else if (options.i !== 'http' && options.i !== 'https') {
    yargs.showHelp();
    console.error('Wrong protocol: only supports "http" and "https"');
  } else {
    cmdDashboard(options);
  }
} else if (command === 'manage') {
  options = yargs
  .reset()
  .usage(`Usage: ${executable} manage [options]`)
  .example(`${executable} manage`, 'Go to management console')
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
