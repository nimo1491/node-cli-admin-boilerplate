import * as chalk from 'chalk';
import * as ora from 'ora';
import { safeLoad, safeDump } from 'js-yaml';
import { readFileSync, writeFileSync, accessSync, constants as fsMode } from 'fs';
import { MgtEntity } from './MgtEntity';

interface IDiscoverOptions {
  b: number;
  e: number;
}

interface IDevice {
  ip: string;
}

interface IConfig {
  protocol: string;
  devices: IDevice[];
}

const devList: IDevice[] = [];

export async function cmdDiscover(options: IDiscoverOptions) {
  const configFile: string = 'config.yml';
  const ports: number[] = [];
  let config: IConfig = {
    protocol: 'http',
    devices: [],
  };

  // Enumerate all ports
  for (let i = options.b; i <= options.e; ++i) {
    ports.push(i);
  }

  // Check and read the existing config file
  try {
    accessSync(configFile, fsMode.R_OK | fsMode.W_OK);
    config = safeLoad(readFileSync(configFile, 'utf8'));
  } catch (error) {
    console.error('File could not be opened or doesn\'t exist');
  }

  // Discovering
  console.log(chalk.blue('Discovering devices:'));
  await Promise.all(ports.map(
    port => detectNodeWrapper(port),
  ));
  console.log(chalk.blue(`Got ${devList.length} of ${ports.length} nodes...`));

  // Combine and filter the devices
  const devSet = new Set();
  config.devices.concat(devList).forEach((dev) => {
    devSet.add(JSON.stringify(dev));
  });
  config.devices = Array.from(devSet).map(dev => JSON.parse(dev));

  // Write back
  try {
    writeFileSync(configFile, safeDump(config), 'utf8');
  } catch (error) {
    return console.error(error);
  }
  console.log(chalk.blue(`Great, now you can check ${configFile} for the discovered devices`));
}

/** A wrapper function for executing login, and then logout */
async function detectNodeWrapper(port: number, ipAddr = '127.0.0.1', protocol = 'http',
  username = 'admin' , password = 'admin') {
  const mgtEntity = new MgtEntity(`${ipAddr}:${port}`, protocol, username, password);

  const message: string = `Detecting ${ipAddr}:${port} ... `;
  const spinner = ora(message).start();

  try {
    await mgtEntity.login();
    await mgtEntity.logout();
    spinner.succeed(`Response from ${ipAddr}:${port}`);
    devList.push({ ip: `${ipAddr}:${port}` });
  } catch (error) {
    spinner.stop();
  }
}
