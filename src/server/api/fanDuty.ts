import { Router } from 'express';
import { MgtModule } from '../controllers/MgtModule';

export function fanDuty() {
  const fanDuty = Router();
  const mgtModule = new MgtModule();

  fanDuty.get('/', (req, res) => {
    const resData = mgtModule.getFanDuty();
    res.json(resData);
  });

  return fanDuty;
}
