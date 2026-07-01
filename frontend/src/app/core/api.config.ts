import { environment } from '../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiUrl,
  endpoints: {
    health: `${environment.apiUrl}/health`,
    users: {
      me: `${environment.apiUrl}/users/me`,
    }
  }
};
