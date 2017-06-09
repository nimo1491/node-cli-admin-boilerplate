import { Router } from 'express';
import { MgtModule } from '../controllers/MgtModule';

export function certificateInfo() {
  const certificateInfo = Router();
  const mgtModule = new MgtModule();

  certificateInfo.get('/', (req, res) => {
    const resData = mgtModule.getCertificateInfo();
    res.json(resData);
  });

  return certificateInfo;
}
