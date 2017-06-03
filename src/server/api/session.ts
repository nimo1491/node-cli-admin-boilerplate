import * as uuid from 'node-uuid';
import { Router } from 'express';
import { MgtEntity } from '../controllers/MgtEntity';

export function session() {
  const session = Router();
  const mgtEntity = new MgtEntity();

  session.post('/', (req, res) => {
    const resData = mgtEntity.login(req.body);

    if (resData.error) {
      process.nextTick(() => {
        res.status(401).json(resData);
      });
    } else {
      if (req.session !== undefined) {
        req.session.regenerate(() => {
          if (req.session !== undefined) {
            // Generate csrf token
            const token = uuid.v4().slice(0, 8);
            req.session.user = token;
            res.json(Object.assign({}, resData, {
              'CSRFToken': token,
            }));
          }
        });
      }
    }
  });

  session.delete('/', (req, res) => {
    const resData = mgtEntity.logout();

    if (req.session !== undefined) {
      req.session.destroy(() => {
        res.json(resData);
      })
    }
  });

  return session;
}

