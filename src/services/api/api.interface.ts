import type {
  AuthResponse,
  RemoteConfig,
  ReviewConfig,
  ReviewResult,
  TrialReviewResult,
  TrialStatus,
} from '../../types/index.js';

export interface IAuthApi {
  login(email: string, password: string): Promise<AuthResponse>;
  signup(email: string, password: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
  logout(accessToken: string): Promise<void>;
  generateCIToken(accessToken: string): Promise<string>;
}

export interface IReviewApi {
  analyze(diff: string, accessToken: string, config?: ReviewConfig): Promise<ReviewResult>;
  trialAnalyze(diff: string, fingerprint: string): Promise<TrialReviewResult>;
}

export interface IConfigApi {
  get(accessToken: string, org?: string, repo?: string): Promise<RemoteConfig>;
}

export interface ITrialApi {
  getStatus(fingerprint: string): Promise<TrialStatus>;
}

export interface IKodusApi {
  auth: IAuthApi;
  review: IReviewApi;
  config: IConfigApi;
  trial: ITrialApi;
}

