export interface IFirmwareInfoRes {
  device_id: number;
  revision: number;
  fw_rev_1: number;
  fw_rev_2: number;
  ipmi_version: number;
  dev_support: number;
  mfg_id_0: number;
  mfg_id_1: number;
  mfg_id_2: number;
  prod_id: number;
  aux: number;
  fw_ver: string;
  date: string;
  time: string;
  active_image: number;
}

const firmwareList: IFirmwareInfoRes[] = [
  {
    device_id: 32,
    revision: 1,
    fw_rev_1: 0,
    fw_rev_2: 18,
    ipmi_version: 2,
    dev_support: 191,
    mfg_id_0: 0,
    mfg_id_1: 0,
    mfg_id_2: 0,
    prod_id: 514,
    aux: 6,
    fw_ver: '0.12.6',
    date: 'Jun 5 2017',
    time: '11:16:23 CST',
    active_image: 0,
  },
  {
    device_id: 32,
    revision: 1,
    fw_rev_1: 0,
    fw_rev_2: 18,
    ipmi_version: 2,
    dev_support: 191,
    mfg_id_0: 0,
    mfg_id_1: 0,
    mfg_id_2: 0,
    prod_id: 514,
    aux: 6,
    fw_ver: '0.13.0',
    date: 'Jun 12 2017',
    time: '11:03:18 CST',
    active_image: 0,
  },
  {
    device_id: 32,
    revision: 1,
    fw_rev_1: 0,
    fw_rev_2: 18,
    ipmi_version: 2,
    dev_support: 191,
    mfg_id_0: 0,
    mfg_id_1: 0,
    mfg_id_2: 0,
    prod_id: 514,
    aux: 6,
    fw_ver: '0.16.4',
    date: 'Jun 24 2017',
    time: '12:32:18 CST',
    active_image: 0,
  },
];

/** Get a random firmware object */
export function findFirmwareInfo() {
  return firmwareList[Math.floor(Math.random() * firmwareList.length)];
}
