import * as Vorpal from 'vorpal';
import * as columnify from 'columnify';
import * as chalk from 'chalk';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { MgtModule } from './MgtModule';

// Bypass authentication for self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Replace it with what you want
const delimiter: string = 'Mgt$';

const fwInfoList: any = [];
let errors: number = 0;

export function cmdManage() {
  const vorpal = new Vorpal();
  let config: any;

  try {
    config = safeLoad(readFileSync('./config.yml', 'utf8'));
  } catch (error) {
    return console.error(error);
  }

  vorpal
    .command('mc info', 'Get firmware information')
    .action(async (args, callback) => {
      await Promise.all(config.devices.map(
        dev => getFirmwareInfoWrapper(dev.ip, config.protocol, dev.username, dev.password),
      ));

      const columns = columnify(fwInfoList, {
        headingTransform: heading => chalk.bold.magenta(heading.toUpperCase()),
      });
      console.log(columns);

      if (errors > 0) {
        console.error(chalk.red('!!! Got some errors, please check log for the detail'));
      }
    });

  vorpal
    .delimiter(delimiter)
    .show()
}

/** A wrapper function for executing login, then get firmware info, and then logout */
async function getFirmwareInfoWrapper(ipAddr: string, protocol: string, username: string , password: string) {
  const mgtModule = new MgtModule(ipAddr, protocol, username, password);

  try {
    await mgtModule.login();

    const fwInfo = await mgtModule.getFirmwareinfo();
    fwInfoList.push(Object.assign(
      { 'Node': ipAddr },
      { 'Version': fwInfo.fw_ver },
      { 'Date': fwInfo.date },
      { 'Time': fwInfo.time },
    ));

    await mgtModule.logout();
  } catch (error) {
    errors++;
  }
}
