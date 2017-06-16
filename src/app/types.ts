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
  fan1Duty;
  fan2Duty;
  fan3Duty;
  fan4Duty;
  fan5Duty;
}
