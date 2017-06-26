import { MgtEntity } from './MgtEntity';

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

export interface IDetectNodeWrapperRequest {
  port?: number;
  ipAddr: string;
  protocol: string;
  username: string;
  password: string;
}

export interface IGetInfoWrapperRequest {
  ipAddr: string;
  protocol: string;
  username: string;
  password: string;
}

/** A wrapper function for executing login, and then logout */
export async function detectNodeWrapper(req: IDetectNodeWrapperRequest): Promise<IDiscoveredDevice | void> {
  let address: string;
  if (req.port === undefined) {
    address = `${req.ipAddr}`;
  } else {
    address = `${req.ipAddr}:${req.port}`;
  }

  const mgtEntity = new MgtEntity(address, req.protocol, req.username, req.password);

  try {
    await mgtEntity.login();
    await mgtEntity.logout();
    return Promise.resolve({ ip: `${address}` });
  } catch (error) {
    return Promise.resolve(undefined);
  }
}

/** A wrapper function for executing login, then get firmware info, and then logout */
export async function getFirmwareInfoWrapper(req: IGetInfoWrapperRequest): Promise<IFirmwareInfoPout | IErrorOut> {
  const mgtEntity = new MgtEntity(req.ipAddr, req.protocol, req.username, req.password);

  try {
    await mgtEntity.login();
    const fwInfo = await mgtEntity.getFirmwareInfo();
    await mgtEntity.logout();

    return Promise.resolve({
      node: req.ipAddr,
      version: fwInfo.fw_ver,
      date: fwInfo.date,
      time: fwInfo.time,
    });
  } catch (error) {
    return Promise.resolve({
      node: req.ipAddr,
      error: error,
    });
  }
}

/** Type guard for the response of firmware information */
export function isIFirmwareInfoPout(info: IFirmwareInfoPout | IErrorOut): info is IFirmwareInfoPout {
  return (<IFirmwareInfoPout>info).version !== undefined;
}

/** A wrapper function for executing login, then get certificate info, and then logout */
export async function getCertificateInfoWrapper(req: IGetInfoWrapperRequest): Promise<ICertificateInfoPout | IErrorOut> {
  const mgtEntity = new MgtEntity(req.ipAddr, req.protocol, req.username, req.password);

  try {
    await mgtEntity.login();
    const certInfo = await mgtEntity.getCertificateInfo();
    await mgtEntity.logout();

    return Promise.resolve({
      node: req.ipAddr,
      org: certInfo.to_organization,
      unit: certInfo.to_organization_unit,
      country: certInfo.to_country,
      expiration: certInfo.valid_till,
    });
  } catch (error) {
    return Promise.resolve({
      node: req.ipAddr,
      error: error,
    });
  }
}

/** Type guard for the response of certificate information */
export function isICertificateInfoPout(info: ICertificateInfoPout | IErrorOut): info is ICertificateInfoPout {
  return (<ICertificateInfoPout>info).org !== undefined;
}
