import { Router } from 'express';
import { MgtModule } from '../controllers/MgtModule';

export function sensorInfo() {
  const sensorInfo = Router();
  const mgtModule = new MgtModule();

  sensorInfo.get('/', (req, res) => {
    const resData = mgtModule.getSensorInfo();
    res.json(resData);
  });

  return sensorInfo;
}
