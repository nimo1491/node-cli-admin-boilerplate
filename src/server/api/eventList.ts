import { Router } from 'express';
import { MgtModule } from '../controllers/MgtModule';

export function eventList() {
  const eventList = Router();
  const mgtModule = new MgtModule();

  eventList.get('/', (req, res) => {
    const resData = mgtModule.getEventList();
    res.json(resData);
  });

  return eventList;
}
