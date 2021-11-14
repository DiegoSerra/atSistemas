import { Http } from '@breakingbad/services/Http';
import axios from 'axios';

export const injectTokenHeader = (accessToken: string) => {
  Http.setDefaultHeader('Authorization', `Bearer ${accessToken}`);
}

export const removeTokenHeader = () => {
  Http.clearDefaultHeader('Authorization');
}

export const injectExpiredTokenInterceptor = () => {
  Http.responseInterceptor(
    (res: any) => res,
    async (err: any) => {
      if (axios.isCancel(err)) {
        return Promise.reject()
      };
      try {
        switch (err.response.status) {
          default:
            break;
        }
      } catch (e) {}
    }
  );

}
