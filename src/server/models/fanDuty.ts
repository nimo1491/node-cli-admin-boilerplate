export interface IFanDutyRes {
  fan1Duty: number;
  fan2Duty: number;
  fan3Duty: number;
  fan4Duty: number;
  fan5Duty: number;
}

/** Get random fan duties */
export function findFanDuty() {
  const max: number = 100;
  const min: number = 10;

  const fanDuties: IFanDutyRes = {
    fan1Duty: Math.floor(Math.random() * (max - min)) + min,
    fan2Duty: Math.floor(Math.random() * (max - min)) + min,
    fan3Duty: Math.floor(Math.random() * (max - min)) + min,
    fan4Duty: Math.floor(Math.random() * (max - min)) + min,
    fan5Duty: Math.floor(Math.random() * (max - min)) + min,
  }

  return fanDuties;
}
