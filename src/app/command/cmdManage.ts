import * as Vorpal from 'vorpal';
import * as columnify from 'columnify';
import * as chalk from 'chalk';
import * as Listr from 'listr';
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

  try {
    config = safeLoad(readFileSync('./config.yml', 'utf8'));
  } catch (error) {
    return console.error(error);
  }

  vorpal
    .command('mc info', 'Get firmware information')
    .action(async (args, callback) => {
      const infoList: IFirmwareInfoPout[] = [];
      const errorList: IErrorOut[] = [];

      const subtasks = config.devices.map((dev) => {
        const req: IGetInfoWrapperRequest = {
          ipAddr: dev.ip,
          protocol: dev.protocol || config.protocol,
          username: dev.username || config.username,
          password: dev.password || config.password,
        };

        return {
          title: `${dev.ip}`,
          task: async (ctx, task) => {
            const result = await getFirmwareInfoWrapper(req);
            if (isIFirmwareInfoPout(result)) {
              infoList.push(result);
            } else {
              errorList.push(result);
            }
          },
        }
      });

      const tasks = new Listr([
        {
          title: 'Getting mc info',
          task: () => {
            return new Listr(subtasks, {
              concurrent: 10,
            });
          },
        },
      ], { renderer: 'silent' });

      try {
        await tasks.run();
      } catch (error) {}

      const columns = columnify(infoList, {
        headingTransform: heading => chalk.bold.magenta(heading.toUpperCase()),
        config: {
          node: { minWidth: 24 },
        },
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
      const infoList: ICertificateInfoPout[] = [];
      const errorList: IErrorOut[] = [];

      const subtasks = config.devices.map((dev) => {
        const req: IGetInfoWrapperRequest = {
          ipAddr: dev.ip,
          protocol: dev.protocol || config.protocol,
          username: dev.username || config.username,
          password: dev.password || config.password,
        };

        return {
          title: `${dev.ip}`,
          task: async (ctx, task) => {
            const result = await getCertificateInfoWrapper(req);
            if (isICertificateInfoPout(result)) {
              infoList.push(result);
            } else {
              errorList.push(result);
            }
          },
        }
      });

      const tasks = new Listr([
        {
          title: 'Getting ssl certificate',
          task: () => {
            return new Listr(subtasks, {
              concurrent: 10,
            });
          },
        },
      ], { renderer: 'silent' });

      try {
        await tasks.run();
      } catch (error) {}

      const columns = columnify(infoList, {
        headingTransform: heading => chalk.bold.magenta(heading.toUpperCase()),
        config: {
          node: { minWidth: 24 },
        },
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
