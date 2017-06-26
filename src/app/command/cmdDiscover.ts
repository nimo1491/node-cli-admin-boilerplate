import * as chalk from 'chalk';
import * as ip from 'ip';
import { safeLoad, safeDump } from 'js-yaml';
import { readFileSync, writeFileSync, accessSync, constants as fsMode } from 'fs';
import { detectNodeWrapper, IDiscoveredDevice, IDetectNodeWrapperRequest } from '../management/mgtWrapper';
import { IConfig } from '../configTypes';
import * as Listr from 'listr';

interface IDiscoverOptions {
  b: string | number;
  e: string | number;
  i: string;
  u: string;
  p: string;
}

export async function cmdDiscover(options: IDiscoverOptions) {
  const devList: IDiscoveredDevice[] = [];
  const configFile: string = 'config.yml';
  const addresses: (number | string)[] = [];
  let config: IConfig = {
    protocol: options.i,
    devices: [],
  };

  // Check addresses are valid or not and then expand the list
  if (typeof options.b === 'string' && typeof options.e === 'string') {
    if (!ip.isV4Format(options.b) || !ip.isV4Format(options.e)) {
      return console.error(chalk.red('!!! Invalid format of IP addresses'));
    }

    if (!isValidIpRange(options.b, options.e)) {
      return console.error(chalk.red('!!! Invalid range of IP addresses'));
    }

    const beginArr = options.b.split('.').map((subIp) => parseInt(subIp));
    const endArr = options.e.split('.').map((subIp) => parseInt(subIp));

    for (let i = beginArr[3]; i <= endArr[3]; ++i) {
      addresses.push(`${beginArr[0]}.${beginArr[1]}.${beginArr[2]}.${i}`);
    }
  } else if (typeof options.b === 'number' && typeof options.e === 'number') {
    if (options.b > options.e) {
      return console.error(chalk.red('!!! Invalid range of port numbers'));
    }

    for (let i = options.b; i <= options.e; ++i) {
      addresses.push(i);
    }
  } else {
    return console.error(chalk.red('!!! Invalid format of IP address or port number'));
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
  const subtasks = addresses.map((addr) => {
    let req: IDetectNodeWrapperRequest;

    if (typeof addr === 'string') {
      req = {
        port: undefined,
        ipAddr: addr,
        protocol: options.i,
        username: options.u,
        password: options.p,
      };
    } else {
      req = {
        port: addr,
        ipAddr: '127.0.0.1',
        protocol: options.i,
        username: options.u,
        password: options.p,
      };
    }

    return {
      title: `${addr}`,
      task: async (ctx, task) => {
        const result = await detectNodeWrapper(req);
        if (result !== undefined) {
          task.title = chalk.green(`Response from ${addr}`);
          devList.push(result);
        } else {
          task.skip(chalk.red('No response'));
        }
      },
    }
  });

  const tasks = new Listr([
    {
      title: 'Discovering',
      task: () => {
        return new Listr(subtasks, {
          concurrent: 10,
        });
      },
    },
  ]);

  try {
    await tasks.run();
  } catch (error) {}

  for (const dev of devList) {
    console.log(chalk.green(`Response from ${dev.ip}`));
  }
  console.log(chalk.blue(`Got ${devList.length} of ${addresses.length} nodes...`));

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

  if (devList.length === 0) {
    console.log(chalk.yellow('Oops, no discovered device...'));
  } else {
    console.log(chalk.blue(`Great, now you can check ${configFile} for the discovered devices`));
  }
}

/** Check IP range is valid or not */
function isValidIpRange(begin: string, end: string): boolean {
  const beginArr = begin.split('.');
  const endArr = end.split('.');

  for (let i = 0; i < 3; ++i) {
    if (beginArr[i] !== endArr[i]) {
      console.log(chalk.red('!!! Sorry, currently only support discovering IP addresses within mask 24 at a time'));
      console.log(chalk.yellow('For example: 192.168.1.1 ~ 192.168.1.255, 10.109.62.1 ~ 10.109.62.255'));
      return false;
    }
  }

  return true;
}
