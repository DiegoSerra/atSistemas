import { useSelector } from "@breakingbad/utils/Context";
import { RootState } from "store";
import { SplashScreen } from "views";

type Props = {
  children: React.ReactNode
}

export default function SplashScreenWrapper({ children }: Props): JSX.Element {
	const { loadingI18n } = useSelector((state: RootState) => state.language);

  return (
    <>
      {loadingI18n ? <SplashScreen /> : children}
    </>
  );
}
