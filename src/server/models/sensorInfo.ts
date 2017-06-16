export interface ISensorInfoRes {
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

const sensorList: ISensorInfoRes[] = [
  {
    id: 1,
    sensor_number: 1,
    name: 'SYS_12V',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'voltage',
    type_number: 2,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'volts',
  },
  {
    id: 2,
    sensor_number: 32,
    name: 'SYS_POWER',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'power_supply',
    type_number: 8,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'watts',
  },
  {
    id: 3,
    sensor_number: 33,
    name: 'CPU_POWER',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'power',
    type_number: 1,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'watts',
  },
  {
    id: 4,
    sensor_number: 34,
    name: 'MEMORY_POWER',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'power',
    type_number: 1,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'watts',
  },
  {
    id: 5,
    sensor_number: 35,
    name: 'FAN_BP_POWER',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'power',
    type_number: 8,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'watts',
  },
  {
    id: 6,
    sensor_number: 36,
    name: 'HDD_BP_POWER',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'power',
    type_number: 8,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'watts',
  },
  {
    id: 7,
    sensor_number: 48,
    name: 'SYS_INLET_TEMP',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'temperature',
    type_number: 1,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'deg_c',
  },
  {
    id: 8,
    sensor_number: 49,
    name: 'SYS_OUTLET_TEMP',
    owner_id: 32,
    owner_lun: 0,
    raw_reading: 0,
    type: 'temperature',
    type_number: 1,
    reading: 0,
    sensor_state: 1,
    discrete_state: 0,
    lower_non_recoverable_threshold: 0,
    lower_critical_threshold: 0,
    lower_non_critical_threshold: 0,
    higher_non_critical_threshold: 0,
    higher_critical_threshold: 0,
    higher_non_recoverable_threshold: 0,
    accessible: 0,
    unit: 'deg_c',
  },
];

/** Get a random sensor info array */
export function findSensorInfo(): ISensorInfoRes[] {
  updateSensorReading();
  return sensorList;
}

/** Update sensors' reading every 5 seconds */
function updateSensorReading() {
  setInterval(() => {
    sensorList[0].reading = Math.random() * (12.999 - 11.501) + 11.501;
    sensorList[1].reading = Math.floor(Math.random() * (250 - 50) + 50);
    sensorList[2].reading = Math.floor(Math.random() * (120 - 30) + 30);
    sensorList[3].reading = Math.floor(Math.random() * (50 - 3) + 3);
    sensorList[4].reading = Math.floor(Math.random() * (60 - 25) + 25);
    sensorList[5].reading = Math.floor(Math.random() * (60 - 25) + 25);
    sensorList[6].reading = Math.floor(Math.random() * (100 - 10) + 10);
    sensorList[7].reading = Math.floor(Math.random() * (130 - 30) + 30);
  }, 5000);
}
