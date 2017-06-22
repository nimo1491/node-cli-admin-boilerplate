import * as Vorpal from 'vorpal';
import * as columnify from 'columnify';
import * as chalk from 'chalk';
import * as winston from 'winston';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { IConfig } from '../configTypes';
import {
  IErrorOut,
  IFirmwareInfoPout,
  ICertificateInfoPout,
  getFirmwareInfoWrapper,
  getCertificateInfoWrapper,
  isIFirmwareInfoPout,
  isICertificateInfoPout,
} from '../management/mgtWrapper';

// Bypass authentication for self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Replace it with what you want
const delimiter: string = 'Mgt$';

export function cmdManage() {
  const vorpal = new Vorpal();
  let config: IConfig;

  try {
    config = safeLoad(readFileSync('./config.yml', 'utf8'));
  } catch (error) {
    return console.error(error);
  }

  // Setup logger
  winston.configure({
    transports: [
      new (winston.transports.File)({ filename: 'cli_admin.log' }),
    ],
  });

  vorpal
    .command('mc info', 'Get firmware information')
    .action(async (args, callback) => {
      const results = await Promise.all(config.devices.map(
        dev => getFirmwareInfoWrapper(dev.ip, config.protocol, 'admin', 'admin'),
      ));

      const infoList: IFirmwareInfoPout[] = [];
      const errorList: IErrorOut[] = [];
      for (const dev of results) {
        if (isIFirmwareInfoPout(dev)) {
          infoList.push(dev);
        } else {
          errorList.push(dev);
        }
      }

      const columns = columnify(infoList, {
        headingTransform: heading => chalk.bold.magenta(heading.toUpperCase()),
      });
      console.log(columns);

      if (errorList.length > 0) {
        console.error(chalk.red('!!! Got some errors, please check log for the details'));
        for (const err of errorList) {
          winston.log('error', err.node);
          winston.log('error', err.error);
        }
      }
    });

  vorpal
    .command('ssl', 'Get SSL certificate')
    .action(async (args, callback) => {
      const results = await Promise.all(config.devices.map(
        dev => getCertificateInfoWrapper(dev.ip, config.protocol, 'admin', 'admin'),
      ));

      const infoList: ICertificateInfoPout[] = [];
      const errorList: IErrorOut[] = [];
      for (const dev of results) {
        if (isICertificateInfoPout(dev)) {
          infoList.push(dev);
        } else {
          errorList.push(dev);
        }
      }

      const columns = columnify(infoList, {
        headingTransform: heading => chalk.bold.magenta(heading.toUpperCase()),
      });
      console.log(columns);

      if (errorList.length > 0) {
        console.error(chalk.red('!!! Got some errors, please check log for the details'));
        for (const err of errorList) {
          winston.log('error', err.node);
          winston.log('error', err.error);
        }
      }
    });

  vorpal
    .delimiter(delimiter)
    .show()
}
