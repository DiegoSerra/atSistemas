export const defaultThemeOptions = {
	typography: {
		fontFamily: ['Poppins', 'Roboto', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		useNextVariants: true,
		suppressDeprecationWarnings: true
	},
	overrides: {
		MuiButton: {
			root: {
				textTransform: 'none',
				borderRadius: '18px'
			},
			sizeSmall: {
				borderRadius: '15px'
			},
			sizeLarge: {
				borderRadius: '21px'
			},
			contained: {
				boxShadow: 'none',
				'&:hover, &:focus': {
					boxShadow: 'none'
				}
			}
		},
		MuiTab: {
			root: {
				textTransform: 'none'
			}
		},
		// MuiMenu: {
		// 	paper: {
		// 		borderRadius: 12
		// 	}
		// },
		MuiDialog: {
			paper: {
				borderRadius: 16
			}
		},
		MuiPaper: {
			rounded: {
				borderRadius: 16
			}
		},
		MuiPopover: {
			paper: {
				borderRadius: 8
			}
		},
		MuiFilledInput: {
			root: {
				borderRadius: 4,
				'&:before, &:after': {
					display: 'none'
				}
			}
		}
	}
};

export const mustHaveThemeOptions = {
	typography: {
		htmlFontSize: 10,
		fontSize: 13,
		body1: {
			fontSize: '1.3rem'
		},
		body2: {
			fontSize: '1.3rem'
		}
	}
};