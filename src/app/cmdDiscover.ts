import * as chalk from 'chalk';
import { safeLoad, safeDump } from 'js-yaml';
import { readFileSync, writeFileSync, accessSync, constants as fsMode } from 'fs';
import { detectNodeWrapper, IDiscoveredDevice } from './MgtWrapper';

interface IDiscoverOptions {
  b: number;
  e: number;
}

interface IConfig {
  protocol: string;
  devices: IDiscoveredDevice[];
}

export async function cmdDiscover(options: IDiscoverOptions) {
  const devList: IDiscoveredDevice[] = [];
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
    console.error(chalk.yellow('File could not be opened or doesn\'t exist'));
  }

  // Discovering
  console.log(chalk.blue('Discovering devices:'));
  const results = await Promise.all(ports.map(
    port => detectNodeWrapper(port),
  ));

  for (const dev of results) {
    if (dev !== undefined && dev !== null) {
      devList.push(dev);
    }
  }
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
