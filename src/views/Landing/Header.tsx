import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setCharactersSearchText } from '@breakingbad/context/characters';
import { t } from '@breakingbad/utils/Internationalization';
import { useRef } from 'react';
import useScroll from '@breakingbad/hooks/useScroll';

const Header = () => {
	const dispatch = useDispatch();
	const searchText = useSelector<RootState>(({ characters }) => characters.searchText);
  const searchRef = useRef<HTMLElement>(null);

  useScroll(searchRef, 'top-8');

	return (
    <div className="flex flex-col items-center justify-center px-12">
      <div className="flex flex-col items-center w-full">
        <img
          className="block rounded"
          src="assets/images/logos/breaking-bad-400-400.png"
          height="300"
          width="300"
          alt="Breaking-bad"
        />

        <Paper
          component='div'
          elevation={5}
          variant='elevation'
          ref={searchRef}
          className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 z-50 shadow"
        >
          <Icon color="action">search</Icon>

          <Input
            placeholder={t('search')}
            className="flex flex-1 mx-8"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': t('search')
            }}
            onChange={ev => dispatch(setCharactersSearchText(ev))}
          />
        </Paper>
      </div>
    </div>
	);
}

export default Header;
