import { Theme, ThemeProvider } from '@material-ui/core/styles';
import { selectMainTheme } from '@breakingbad/context/settings';
import { useSelector } from '@breakingbad/utils/Context';
import React, { memo } from 'react';

type Props = {
	children: React.ReactNode
}

const BreakingBadTheme = ({ children }: Props) => {
	const mainTheme: Theme = useSelector(selectMainTheme);

	return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
}

export default memo(BreakingBadTheme);
