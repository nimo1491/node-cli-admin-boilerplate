import { Router } from 'express';
import { MgtModule } from '../controllers/MgtModule';

export function chassisStatus() {
  const chassisStatus = Router();
  const mgtModule = new MgtModule();

  chassisStatus.get('/', (req, res) => {
    const resData = mgtModule.getChassisStatus();
    res.json(resData);
  });

  return chassisStatus;
}
