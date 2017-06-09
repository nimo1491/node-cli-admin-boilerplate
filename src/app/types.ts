export interface IFirmwareInfo {
  fw_ver: string;
  date: string;
  time: string;
}

export interface ICertificateInfo {
  to_organization: string;
  to_organization_unit: string;
  to_country: string;
  valid_till: string;
}
