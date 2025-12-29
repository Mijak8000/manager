import type { IKodusApi } from './api.interface.js';
import { MockApi } from './api.mock.js';
import { RealApi } from './api.real.js';

export type { IKodusApi } from './api.interface.js';

function createApi(): IKodusApi {
  const useMock =
    process.env.KODUS_MOCK === 'true' ||
    (!process.env.KODUS_API_URL && process.env.NODE_ENV !== 'production');

  return useMock ? new MockApi() : new RealApi();
}

export const api = createApi();

