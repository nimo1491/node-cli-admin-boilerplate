import * as request from 'request';
import * as type from './types';

/** Promisify all rest requests */
export class MgtEntity {
  private readonly ipAddr: string;
  private readonly protocol: string;
  private readonly username: string;
  private readonly password: string;
  private cookie: string;
  private token: string;

  public constructor(ipAddr: string, protocol = 'http', username = 'admin', password = 'admin') {
    this.ipAddr = ipAddr;
    this.protocol = protocol;
    this.username = username;
    this.password = password;
  }

  public login(): Promise<{}> {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `${this.protocol}://${this.ipAddr}/api/session`,
        form: {
          username: this.username,
          password: this.password,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        this.cookie = response.headers['set-cookie'];
        this.token = JSON.parse(response.body).CSRFToken;
        return resolve();
      });
    });
  }

  public logout(): Promise<{}> {
    return new Promise((resolve, reject) => {
      request({
        method: 'DELETE',
        url: `${this.protocol}://${this.ipAddr}/api/session`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        this.cookie = '';
        this.token = '';
        return resolve();
      });
    });
  }

  public getFirmwareInfo(): Promise<type.IFirmwareInfo> {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `${this.protocol}://${this.ipAddr}/api/firmware-info`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        return resolve(JSON.parse(body));
      });
    });
  }

  public getCertificateInfo(): Promise<type.ICertificateInfo> {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `${this.protocol}://${this.ipAddr}/api/settings/ssl/certificate`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        return resolve(JSON.parse(body));
      });
    });
  }

  public getUptime(): Promise<type.IUptime> {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `${this.protocol}://${this.ipAddr}/api/status/uptime`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        return resolve(JSON.parse(body));
      });
    });
  }

  public getChassisStatus(): Promise<type.IChassisStatus> {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `${this.protocol}://${this.ipAddr}/api/chassis-status`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        return resolve(JSON.parse(body));
      });
    });
  }

  public getSensorInfo(): Promise<type.ISensorInfo[]> {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `${this.protocol}://${this.ipAddr}/api/sensors`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        return resolve(JSON.parse(body));
      });
    });
  }

  public getEventList(): Promise<type.IEventLog[]> {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `${this.protocol}://${this.ipAddr}/api/logs/eventlog`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        return resolve(JSON.parse(body));
      });
    });
  }

  public getFanDuty(): Promise<type.IFanDuty> {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: `${this.protocol}://${this.ipAddr}/api/oem/fan-duty`,
        headers: {
          Cookie: this.cookie,
          'X-CSRFTOKEN': this.token,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP Error: ${response.statusCode}`));
        }

        return resolve(JSON.parse(body));
      });
    });
  }
}
