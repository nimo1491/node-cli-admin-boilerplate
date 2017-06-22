import { MgtEntity } from './MgtEntity';
import * as ora from 'ora';

export interface IDiscoveredDevice {
  ip: string;
}

export interface IErrorOut {
  node: string;
  error: string;
}

export interface IFirmwareInfoPout {
  node: string;
  version: string;
  date: string;
  time: string;
}

export interface ICertificateInfoPout {
  node: string;
  org: string;
  unit: string;
  country: string;
  expiration: string;
}

/** A wrapper function for executing login, and then logout */
export async function detectNodeWrapper(port: number, ipAddr = '127.0.0.1', protocol = 'http', username = 'admin' , password = 'admin'): Promise<IDiscoveredDevice | void> {
  const mgtEntity = new MgtEntity(`${ipAddr}:${port}`, protocol, username, password);
  const spinner = ora(`Detecting ${ipAddr}:${port} ... `).start();

  try {
    await mgtEntity.login();
    await mgtEntity.logout();
    spinner.succeed(`Response from ${ipAddr}:${port}`);
    return Promise.resolve({ ip: `${ipAddr}:${port}` });
  } catch (error) {
    spinner.stop();
  }
}

/** A wrapper function for executing login, then get firmware info, and then logout */
export async function getFirmwareInfoWrapper(ipAddr: string, protocol: string, username: string , password: string): Promise<IFirmwareInfoPout | IErrorOut> {
  const mgtEntity = new MgtEntity(ipAddr, protocol, username, password);

  try {
    await mgtEntity.login();
    const fwInfo = await mgtEntity.getFirmwareInfo();
    await mgtEntity.logout();

    return Promise.resolve({
      node: ipAddr,
      version: fwInfo.fw_ver,
      date: fwInfo.date,
      time: fwInfo.time,
    });
  } catch (error) {
    return Promise.resolve({
      node: ipAddr,
      error: error,
    });
  }
}

/** Type guard for the response of firmware information */
export function isIFirmwareInfoPout(info: IFirmwareInfoPout | IErrorOut): info is IFirmwareInfoPout {
  return (<IFirmwareInfoPout>info).version !== undefined;
}

/** A wrapper function for executing login, then get certificate info, and then logout */
export async function getCertificateInfoWrapper(ipAddr: string, protocol: string, username: string , password: string): Promise<ICertificateInfoPout | IErrorOut> {
  const mgtEntity = new MgtEntity(ipAddr, protocol, username, password);

  try {
    await mgtEntity.login();
    const certInfo = await mgtEntity.getCertificateInfo();
    await mgtEntity.logout();

    return Promise.resolve({
      node: ipAddr,
      org: certInfo.to_organization,
      unit: certInfo.to_organization_unit,
      country: certInfo.to_country,
      expiration: certInfo.valid_till,
    });
  } catch (error) {
    return Promise.resolve({
      node: ipAddr,
      error: error,
    });
  }
}

/** Type guard for the response of certificate information */
export function isICertificateInfoPout(info: ICertificateInfoPout | IErrorOut): info is ICertificateInfoPout {
  return (<ICertificateInfoPout>info).org !== undefined;
}
