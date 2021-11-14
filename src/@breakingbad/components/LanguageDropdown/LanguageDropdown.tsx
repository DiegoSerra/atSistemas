import { useSelector } from '@breakingbad/utils/Context/Context';
import { availableLanguages, changeLanguage, Languages, t } from '@breakingbad/utils/Internationalization';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { RootState } from 'store';

const LanguageDropdown = () => {
	const currentLanguageId = useSelector<RootState>(({ language }) => language.settings.language) as Languages;

	const [menu, setMenu] = useState<Element | null>(null);

	const langMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenu(event.currentTarget);
	};

	const langMenuClose = () => {
		setMenu(null);
	};

	function handleLanguageChange(language: Languages) {
		changeLanguage(language);

		langMenuClose();
	}

	return (
		<>
			<Button className="h-40 w-64" onClick={(event) => langMenuClick(event)}>
				<img
					className="mx-4 min-w-20"
					src={`assets/images/flags/${currentLanguageId}.png`}
					alt={t(`languages.${currentLanguageId}`)}
				/>

				<Typography className="mx-4 font-semibold uppercase" color="textSecondary">
					{currentLanguageId}
				</Typography>
			</Button>

			<Popover
				open={Boolean(menu)}
				anchorEl={menu}
				onClose={langMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{availableLanguages.map(lng => (
					<MenuItem key={lng} onClick={() => handleLanguageChange(lng as Languages)}>
						<ListItemIcon className="min-w-40">
							<img className="min-w-20" src={`assets/images/flags/${lng}.png`} alt={t(`languages.${lng}`)} />
						</ListItemIcon>
						<ListItemText primary={t(`languages.${lng}`)} />
					</MenuItem>
				))}
			</Popover>
		</>
	);
}

export default LanguageDropdown;
