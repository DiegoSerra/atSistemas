import { memo } from "react";

function SplashScreen(): JSX.Element {
  return (
    <div id="splash-screen">
			<div className="center">
				<div className="logo">
					<img width="128" src="assets/images/logos/breaking_bad.png" alt="logo" />
				</div>
				<div className="spinner-wrapper">
					<div className="spinner">
						<div className="inner">
							<div className="gap" />
							<div className="left">
								<div className="half-circle" />
							</div>
							<div className="right">
								<div className="half-circle" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default memo(SplashScreen);