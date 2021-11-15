import { useSelector } from '@breakingbad/utils/Context';
import { injectInterceptor } from '@breakingbad/utils/Http';
import { Container } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { memo, Suspense, useEffect } from 'react';
import { RootState } from 'store';
import Footer from '../Footer';
import Loading from '../Loading';
import Router from '../Router';

const useStyles = makeStyles(theme => ({
	'@global': {
		'table.simple tbody tr td': {
			borderColor: theme.palette.divider
		},
		'table.simple thead tr th': {
			borderColor: theme.palette.divider
		},
		'a:not([role=button])': {
			color: theme.palette.secondary.main,
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'underline'
			}
		},
		'a.link, a:not([role=button])[target=_blank]': {
			background: fade(theme.palette.secondary.main, 0.2),
			color: 'inherit',
			borderBottom: `1px solid ${theme.palette.divider}`,
			textDecoration: 'none',
			'&:hover': {
				background: fade(theme.palette.secondary.main, 0.3),
				textDecoration: 'none'
			}
		},
		'[class^="border-"]': {
			borderColor: theme.palette.divider
		},
		'[class*="border-"]': {
			borderColor: theme.palette.divider
		},
		hr: {
			borderColor: theme.palette.divider
		},
		'::-webkit-scrollbar-thumb': {
			boxShadow: `inset 0 0 0 20px ${
				theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
			}`
		},
		'::-webkit-scrollbar-thumb:active': {
			boxShadow: `inset 0 0 0 20px ${
				theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
			}`
		},
		html: {
			backgroundColor: `${theme.palette.background.default}!important`,
			color: `${theme.palette.text.primary}!important`
		}
	},
	root: {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary
	}
}));

const BreakingBadLayout = () => {
	const classes = useStyles();
	const { loadingI18n } = useSelector((state: RootState) => state.language);
	const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    //i18n must be loaded before the user's dynamic routes, as these have keys to the i18n object
    if (!loadingI18n) {
      injectInterceptor(enqueueSnackbar);
    }
  }, [enqueueSnackbar, loadingI18n]);

	return (
		<Suspense fallback={<Loading />}>
			<Container classes={classes} className="pb-60">
				<Router />
			</Container>
			<Footer />
		</Suspense>
	);
}

export default memo(BreakingBadLayout);
