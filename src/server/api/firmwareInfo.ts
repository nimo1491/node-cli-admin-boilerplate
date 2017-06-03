import { Router } from 'express';
import { MgtEntity } from '../controllers/MgtEntity';

export function firmwareInfo() {
  const firmwareInfo = Router();
  const mgtEntity = new MgtEntity();

  firmwareInfo.get('/', (req, res) => {
    const resData = mgtEntity.getFirmwareInfo();
    res.json(resData);
  });

  return firmwareInfo;
}
