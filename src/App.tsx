import './App.scss';
import DefaultMetaTags from '@breakingbad/components/DefaultMetaTags';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SplashScreenWrapper from '@breakingbad/components/SplashScreenWrapper';
import { SnackbarProvider } from 'notistack';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import BreakingBadTheme from '@breakingbad/components/BreakingBadTheme';
import BreakingBadLayout from '@breakingbad/components/BreakingBadLayout';
import { Provider } from '@breakingbad/utils/Context';
import store from 'store';
import history from './history.js';
import { Router } from 'react-router-dom';

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point') as any
});

const generateClassName = createGenerateClassName({ disableGlobal: true });

const App = () => {
  return (
    <div className="App">
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SplashScreenWrapper>
              <Router history={history}>
                <BreakingBadTheme>
                  <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    classes={{
                      containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
                    }}
                  >
                    <DefaultMetaTags />
                    <BreakingBadLayout />
                  </SnackbarProvider>
                </BreakingBadTheme>
              </Router>
            </SplashScreenWrapper>
          </MuiPickersUtilsProvider>
        </Provider>
      </StylesProvider>
    </div>
  );
}

export default App;