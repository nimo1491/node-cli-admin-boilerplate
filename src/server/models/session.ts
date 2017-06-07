export interface ILoginReq {
  username: string;
  password: string;
}

export interface ILoginRes {
  ok?: number;
  privilege?: number;
  extendedpriv?: number;
  racsession_id?: number;
  remote_addr?: string;
  server_name?: string;
  server_addr?: string;
  HTTPSEnabled?: number;
  error?: string;
  code?: number;
}

export interface ILogoutRes {
  ok: number;
}

// Emulator only use admin/admin for login credential
const user = {
  username: 'admin',
  password: 'admin',
}

/** Do a simple authentication */
export function authentication(data: ILoginReq): number {
  if (data.username !== user.username || data.password !== user.password) {
    return -1;
  }

  return 0;
}
