/**
 * Type definitions for the communication data format
 *
 * @module dataTypes
 */

export interface IFirmwareInfo {
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

export interface ICertificateInfo {
  id: number;
  certificate_version: string;
  serial_number: string;
  signature_algorithm: string;
  public_key: string;
  from_common_name: string;
  from_organization: string;
  from_organization_unit: string;
  from_city: string;
  from_state: string;
  from_country: string;
  from_email_id: string;
  valid_from: string;
  valid_till: string;
  to_common_name: string;
  to_organization: string;
  to_organization_unit: string;
  to_city: string;
  to_state: string;
  to_country: string;
  to_email_id: string;
}

export interface ISensorInfo {
  id: number;
  sensor_number: number;
  name: string;
  owner_id: number;
  owner_lun: number;
  raw_reading: number;
  type: string;
  type_number: number;
  reading: number;
  sensor_state: number;
  discrete_state: number;
  lower_non_recoverable_threshold: number;
  lower_critical_threshold: number;
  lower_non_critical_threshold: number;
  higher_non_critical_threshold: number;
  higher_critical_threshold: number;
  higher_non_recoverable_threshold: number;
  accessible: number;
  unit: string;
}

export interface IUptime {
  minutes_per_count: number;
  poh_counter_reading: number;
}

export interface IChassisStatus {
  power_status: number;
  led_status: number;
}

export interface IEventLog {
  id: number;
  record_type: string;
  timestamp: number;
  GenID1: number;
  GenID2: number;
  event_format_ipmi_version: number;
  sensor_type: string;
  sensor_name: string;
  sensor_number: number;
  generator_type: string;
  channel_number: number;
  ipmb_lun: number;
  event_direction: string;
  sensor_reading_value: number;
  triggered_value: number;
  event_reading_class: string;
  event_description: string;
  advanced_event_description: string;
  system_software_type: string;
}

export interface IFanDuty {
  fan1Duty: number;
  fan2Duty: number;
  fan3Duty: number;
  fan4Duty: number;
  fan5Duty: number;
}
