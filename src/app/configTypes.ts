import { IDiscoveredDevice } from './management/mgtWrapper';

export interface IConfig {
  protocol: string;
  username: string;
  password: string;
  devices: IConfigDevice[];
}

export interface IConfigDevice extends IDiscoveredDevice {
  protocol?: string;
  username?: string;
  password?: string;
}
