import { Injectable } from '@nestjs/common';

export interface AppStatus {
  name: string;
  uptime: number;
  version: string;
}

@Injectable()
export class AppService {
  static readonly STARTED_AT = Date.now();

  constructor() {}

  public async getStatus(): Promise<AppStatus> {
    const packageInfo = await import('../package.json');
    return {
      name: packageInfo.name,
      version: packageInfo.version,
      uptime: Date.now() - AppService.STARTED_AT,
    };
  }
}
