import { useState } from "react";
import classNames from 'classnames';
import { Typography, LinearProgress } from "@material-ui/core";
import useTimeout from "@breakingbad/hooks/useTimeout";
import { t } from "@breakingbad/utils/Internationalization";

type Props = {
  delay?: number;
}

const LoadingPage = ({ delay }: Props) => {
  const [showLoading, setShowLoading] = useState(!delay);

  useTimeout(() => {
		setShowLoading(true);
	}, delay);

  return (
		<div className={classNames('flex flex-1 flex-col items-center justify-center p-24', !showLoading && 'hidden')}>
			<Typography className="text-13 sm:text-20 mb-16" color="textSecondary">
        {t('loading')}
			</Typography>
			<LinearProgress className="w-192 sm:w-320 max-w-full rounded-2" color="secondary" />
		</div>
  );
}

export default LoadingPage;
