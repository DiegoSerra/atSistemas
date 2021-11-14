import { Tooltip, IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { memo } from 'react';
import LanguageDropdown from '../LanguageDropdown';

const Footer = () => {
	return (
    <AppBar
      id="footer"
      position="fixed"
      className="z-20 shadow-md bottom-0 top-auto"
      color="default"
    >
      <Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
        <div className="flex flex-grow flex-shrink-0">
          Diego Serra García
        </div>

        <LanguageDropdown />

        <div className="flex flex-grow flex-shrink-0 px-12 justify-end">
          <div className="flex items-center">
            <Tooltip title="LinkedIn" placement="top">
              <IconButton
                className="w-48 h-48 px-4"
                component="a"
                href="https://www.linkedin.com/in/diego-serra-garc%C3%ADa-bb6a29167/"
                target="_blank"
                rel="noreferrer noopener"
                role="button"
              >
                <img
                  src="assets/images/logos/linkedin.png"
                  alt="linkedin"
                  width="32"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub" placement="top">
              <IconButton
                className="w-48 h-48 px-4"
                component="a"
                href="https://github.com/DiegoSerra"
                target="_blank"
                rel="noreferrer noopener"
                role="button"
              >
                <img
                  src="assets/images/logos/github.png"
                  alt="github"
                  width="32"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Toolbar>
    </AppBar>
	);
}

export default memo(Footer);