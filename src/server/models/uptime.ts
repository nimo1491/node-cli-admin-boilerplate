export interface IUptimeRes {
  minutes_per_count: number;
  poh_counter_reading: number;
}

/** Get random uptime */
export function findUptime() {
  const max: number = 300;
  const min: number = 20;

  const uptime: IUptimeRes = {
    minutes_per_count: 60,
    poh_counter_reading: Math.floor(Math.random() * (max - min)) + min,
  }

  return uptime;
}
