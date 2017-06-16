export interface IEventListRes {
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

const eventList: IEventListRes[] = [
  {
    id: 1,
    record_type: 'system_event_record',
    timestamp: 946666830,
    GenID1: 1,
    GenID2: 0,
    event_format_ipmi_version: 4,
    sensor_type: 'system_event',
    sensor_name: 'system_event',
    sensor_number: 0,
    generator_type: 'system_software_id',
    channel_number: 0,
    ipmb_lun: 0,
    event_direction: 'asserted',
    sensor_reading_value: 0,
    triggered_value: 0,
    event_reading_class: 'discrete',
    event_description: 'timestamp_clock_sync',
    advanced_event_description: 'unknown',
    system_software_type: 'bios',
  },
  {
    id: 2,
    record_type: 'system_event_record',
    timestamp: 946669830,
    GenID1: 44,
    GenID2: 96,
    event_format_ipmi_version: 4,
    sensor_type: 'temperature',
    sensor_name: 'SYS_OUTLET_TEMP',
    sensor_number: 163,
    generator_type: 'ipmb_slave_address',
    channel_number: 96,
    ipmb_lun: 0,
    event_direction: 'asserted',
    sensor_reading_value: 64,
    triggered_value: 0,
    event_reading_class: 'discrete',
    event_description: 'upper_non_recoverable_going_high',
    advanced_event_description: 'unknown',
    system_software_type: 'system_management_software',
  },
  {
    id: 3,
    record_type: 'system_event_record',
    timestamp: 946669832,
    GenID1: 32,
    GenID2: 0,
    event_format_ipmi_version: 4,
    sensor_type: 'system_acpi_power_state',
    sensor_name: 'system_acpi_power_state',
    sensor_number: 131,
    generator_type: 'ipmb_slave_address',
    channel_number: 0,
    ipmb_lun: 0,
    event_direction: 'asserted',
    sensor_reading_value: 0,
    triggered_value: 0,
    event_reading_class: 'discrete',
    event_description: 's0_or_g0_working',
    advanced_event_description: 'unknown',
    system_software_type: 'system_management_software',
  },
  {
    id: 4,
    record_type: 'system_event_record',
    timestamp: 946669838,
    GenID1: 32,
    GenID2: 0,
    event_format_ipmi_version: 4,
    sensor_type: 'microcontroller_or_coprocessor',
    sensor_name: 'microcontroller',
    sensor_number: 128,
    generator_type: 'ipmb_slave_address',
    channel_number: 0,
    ipmb_lun: 0,
    event_direction: 'asserted',
    sensor_reading_value: 0,
    triggered_value: 0,
    event_reading_class: 'discrete',
    event_description: 'device_enabled',
    advanced_event_description: 'unknown',
    system_software_type: 'system_management_software',
  },
];

/** Get events */
export function findEventList(): IEventListRes[] {
  return eventList;
}
