import { ILoginReq, ILoginRes, ILogoutRes, authentication } from '../models/session';
import { IFirmwareInfoRes, findFirmwareInfo } from '../models/firmwareInfo';
import { ICertificateInfoRes, findCertificateInfo } from '../models/certificateInfo';

export class MgtModule {
  private static sessionNum: number = 0;

  public constructor() {
  }

  public getSessionNum(): number {
    return MgtModule.sessionNum;
  }

  public login(data: ILoginReq): ILoginRes {
    const ret = authentication(data);

    // Authentication failed
    if (ret !== 0) {
      return {
        error: 'Could not login',
        code: 1009,
      };
    }

    // One session is well enough for testing
    if (MgtModule.sessionNum > 0) {
      return {
        error: 'Maximum number of sessions already in use',
        code: 15000,
      };
    }

    // Occupy the session
    MgtModule.sessionNum += 1;

    return {
      ok: 0,
      privilege: 4,
      extendedpriv: 259,
      racsession_id: 0,
      remote_addr: 'Node Admin CLI',
      server_name: 'Express Emulator',
      server_addr: 'Express Emulator',
      HTTPSEnabled: 1,
    };
  }

  public logout(): ILogoutRes {
    MgtModule.sessionNum -= 1;

    return {
      ok: 0,
    };
  }

  public getFirmwareInfo(): IFirmwareInfoRes {
    return findFirmwareInfo();
  }

  public getCertificateInfo(): ICertificateInfoRes {
    return findCertificateInfo();
  }
}
