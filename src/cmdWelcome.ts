import * as chalk from 'chalk';

interface IWelcomeOptions {
  b: string
}

export function cmdWelcome(options: IWelcomeOptions): void {
  if (options.b !== undefined) {
    console.log(`${chalk.black.bgMagenta('Please enjoy it.')}`);
  } else {
    console.log(`${chalk.cyan('Hello! Thank you for downloading my app.')}`);
  }
}
