import * as Vorpal from 'vorpal';
import * as columnify from 'columnify';
import * as chalk from 'chalk';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { MgtEntity } from './MgtEntity';

// Bypass authentication for self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Replace it with what you want
const delimiter: string = 'Mgt$';

const infoList: any = [];
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

      const columns = columnify(infoList, {
        headingTransform: heading => chalk.bold.magenta(heading.toUpperCase()),
      });
      console.log(columns);

      if (errors > 0) {
        console.error(chalk.red('!!! Got some errors, please check log for the detail'));
      }

      infoList.length = 0;
    });

  vorpal
    .command('ssl', 'Get SSL certificate')
    .action(async (args, callback) => {
      await Promise.all(config.devices.map(
        dev => getCertificateInfoWrapper(dev.ip, config.protocol, dev.username, dev.password),
      ));

      const columns = columnify(infoList, {
        headingTransform: heading => chalk.bold.magenta(heading.toUpperCase()),
      });
      console.log(columns);

      if (errors > 0) {
        console.error(chalk.red('!!! Got some errors, please check log for the detail'));
      }

      infoList.length = 0;
    });

  vorpal
    .delimiter(delimiter)
    .show()
}

/** A wrapper function for executing login, then get firmware info, and then logout */
async function getFirmwareInfoWrapper(ipAddr: string, protocol: string, username: string , password: string) {
  const mgtEntity = new MgtEntity(ipAddr, protocol, username, password);

  try {
    await mgtEntity.login();

    const fwInfo = await mgtEntity.getFirmwareInfo();
    infoList.push(Object.assign(
      { 'Node': ipAddr },
      { 'Version': fwInfo.fw_ver },
      { 'Date': fwInfo.date },
      { 'Time': fwInfo.time },
    ));

    await mgtEntity.logout();
  } catch (error) {
    errors++;
  }
}

/** A wrapper function for executing login, then get certificate info, and then logout */
async function getCertificateInfoWrapper(ipAddr: string, protocol: string, username: string , password: string) {
  const mgtEntity = new MgtEntity(ipAddr, protocol, username, password);

  try {
    await mgtEntity.login();

    const fwInfo = await mgtEntity.getCertificateInfo();
    infoList.push(Object.assign(
      { 'Node': ipAddr },
      { 'Org': fwInfo.to_organization },
      { 'Unit': fwInfo.to_organization_unit },
      { 'Country': fwInfo.to_country },
      { 'Expiration': fwInfo.valid_till },
    ));

    await mgtEntity.logout();
  } catch (error) {
    errors++;
  }
}
