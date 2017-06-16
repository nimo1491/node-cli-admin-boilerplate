import { Router } from 'express';
import { MgtModule } from '../controllers/MgtModule';

export function uptime() {
  const uptime = Router();
  const mgtModule = new MgtModule();

  uptime.get('/', (req, res) => {
    const resData = mgtModule.getUptime();
    res.json(resData);
  });

  return uptime;
}
