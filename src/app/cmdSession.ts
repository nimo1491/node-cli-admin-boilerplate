import * as request from 'request';

export function cmdSession(): void {
  request({
    method: 'POST',
    url: 'http://localhost:8080/api/session',
    form: {
      username: 'admin',
      password: 'admin',
    },
  }, (error, response, body) => {
    if (error) {
      return;
    }

    console.log(`Login: ${response.body}`);
    getFirmwareInfo(response.headers['set-cookie'], JSON.parse(response.body).CSRFToken);
  });
}

function getFirmwareInfo(cookie: string, token: string): void {
  request({
    method: 'GET',
    url: 'http://localhost:8080/api/firmware-info',
    headers: {
      Cookie: cookie,
      'X-CSRFTOKEN': token,
    },
  }, (error, response, body) => {
    if (error) {
      return;
    }

    console.log(`GetFirmwareInfo: ${response.body}`);
    logout(cookie, token);
  });
}

function logout(cookie: string, token: string): void {
  request({
    method: 'DELETE',
    url: 'http://localhost:8080/api/session',
    headers: {
      Cookie: cookie,
      'X-CSRFTOKEN': token,
    },
  }, (error, response, body) => {
    if (error) {
      return;
    }
  });
}
