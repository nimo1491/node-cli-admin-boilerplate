import { Router, Request, Response, NextFunction } from 'express';
import { session } from './session';
import { firmwareInfo } from './firmwareInfo';
import { certificateInfo } from './certificateInfo';
import { uptime } from './uptime';
import { chassisStatus } from './chassisStatus';
import { sensorInfo } from './sensorInfo';
import { eventList } from './eventList';
import { fanDuty } from './fanDuty';

export function api() {
  const api = Router();

  api.use('/session', restrict, csrfProtection, session());
  api.use('/status/uptime', restrict, csrfProtection, uptime());
  api.use('/firmware-info', restrict, csrfProtection, firmwareInfo());
  api.use('/chassis-status', restrict, csrfProtection, chassisStatus());
  api.use('/sensors', restrict, csrfProtection, sensorInfo());
  api.use('/oem/fan-duty', restrict, csrfProtection, fanDuty());
  api.use('/logs/eventlog', restrict, csrfProtection, eventList());
  api.use('/settings/ssl/certificate', restrict, csrfProtection, certificateInfo());

  // Expose API metadata at the root
  api.get('/', (req, res) => {
    res.json({
      'Welcome': 'Feel free to use this rest emulator for management entity',
    });
  });

  return api;
}

/** Middleware for session handling */
function restrict(req: Request, res: Response, next: NextFunction) {
  if (req.session !== undefined) {
    if (req.session.user) {
      return next();
    }
  }

  if (req.method === 'POST' && req.baseUrl === '/api/session') {
    return next();
  }

  res.status(401).json({
    cc: 7,
    error: 'Invalid Authentication',
  });
}

/** Middleware for CSRF validating */
function csrfProtection(req: Request, res: Response, next: NextFunction) {
  if (req.session !== undefined) {
    if (req.headers['x-csrftoken'] === req.session.user) {
      return next();
    }
  }

  res.status(401).json({
    cc: 7,
    error: 'Invalid Authentication',
  });
}
