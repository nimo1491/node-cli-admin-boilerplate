import { Router } from 'express';
import { MgtModule } from '../controllers/MgtModule';

export function firmwareInfo() {
  const firmwareInfo = Router();
  const mgtModule = new MgtModule();

  firmwareInfo.get('/', (req, res) => {
    const resData = mgtModule.getFirmwareInfo();
    res.json(resData);
  });

  return firmwareInfo;
}
