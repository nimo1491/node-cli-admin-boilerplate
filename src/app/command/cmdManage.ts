import * as Vorpal from 'vorpal';
import * as columnify from 'columnify';
import * as chalk from 'chalk';
// import * as winston from 'winston';
import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { IConfig } from '../configTypes';
import { log } from '../log';
import {
  IErrorOut,
  IFirmwareInfoPout,
  ICertificateInfoPout,
  IGetInfoWrapperRequest,
  getFirmwareInfoWrapper,
  getCertificateInfoWrapper,
  isIFirmwareInfoPout,
  isICertificateInfoPout,
} from '../management/mgtWrapper';

// Replace it with what you want
const delimiter: string = 'Mgt$';

export function cmdManage() {
  const vorpal = new Vorpal();
  let config: IConfig;

  // TODO: Support getting username/password for each node in config file
  const username = 'admin';
  const password = 'admin';

  try {
    config = safeLoad(readFileSync('./config.yml', 'utf8'));
  } catch (error) {
    return console.error(error);
  }

  vorpal
    .command('mc info', 'Get firmware information')
    .action(async (args, callback) => {
      const results = await Promise.all(config.devices.map((dev) => {
        const req: IGetInfoWrapperRequest = {
          ipAddr: dev.ip,
          protocol: config.protocol,
          username,
          password,
        };

        return getFirmwareInfoWrapper(req);
      }));

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
          log('error', err.node);
          log('error', err.error);
        }
      }
    });

  vorpal
    .command('ssl', 'Get SSL certificate')
    .action(async (args, callback) => {
      const results = await Promise.all(config.devices.map((dev) => {
        const req: IGetInfoWrapperRequest = {
          ipAddr: dev.ip,
          protocol: config.protocol,
          username,
          password,
        };

        return getCertificateInfoWrapper(req);
      }));

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
          log('error', err.node);
          log('error', err.error);
        }
      }
    });

  vorpal
    .delimiter(delimiter)
    .show()
}
