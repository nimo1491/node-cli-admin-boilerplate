import { IDiscoveredDevice } from './management/mgtWrapper';

export interface IConfig {
  protocol: string;
  devices: IDiscoveredDevice[];
}
