import { Http } from '@breakingbad/services/Http';
import axios, { AxiosResponse } from 'axios';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import { t } from '../Internationalization';

const snackbarOptions: OptionsObject = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration: 5000,
  preventDuplicate: true
}

export const injectInterceptor = (enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) => {
  Http.responseInterceptor(
    (res: AxiosResponse<any>) => res,
    async (err: any) => {
      
      if (axios.isCancel(err)) {
        console.log('cancel', err)
        return Promise.reject()
      };

      try {
        switch (err.response.status) {
          case (400):
          case (500):
            enqueueSnackbar(t(`error.${err.response.status}`), snackbarOptions);
            return Promise.reject(err);
          default:
            break;
        }
      } catch (e) {
        enqueueSnackbar(t(`error.400`), snackbarOptions);
      }
    }
  );

}

