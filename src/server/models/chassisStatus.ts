export interface IChassisStatusRes {
  power_status: number;
  led_status: number;
}

/** Get random chassis status */
export function findChassisStatus() {
  const chassisStatus: IChassisStatusRes = {
    power_status: Math.floor(Math.random() * 2),
    led_status: 0,
  }

  return chassisStatus;
}
