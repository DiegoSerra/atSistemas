import { getAllCharacters } from '@breakingbad/services/Character';
import { CharacterType } from '@breakingbad/types/Character.type';
import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getCharacters = createAsyncThunk('characters/getCharacters', async (): Promise<CharacterType[]> => await getAllCharacters());

const charactersAdapter = createEntityAdapter({
	selectId: (character: CharacterType) => character.char_id
});

export const { selectAll: selectCharacters, selectById: selectCharacterById } = charactersAdapter.getSelectors<RootState>(
	(state: RootState) => state.characters
);

const charactersSlice = createSlice({
	name: 'characters',
	initialState: charactersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCharactersSearchText: {
			reducer: (state, action: PayloadAction<string>) => {
				state.searchText = action.payload;
			},
			prepare: (event) => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: (builder) => {
    builder
			.addCase(getCharacters.fulfilled, charactersAdapter.setAll)
			.addCase(getCharacters.rejected, charactersAdapter.removeAll)
  },
});

export const { setCharactersSearchText } = charactersSlice.actions;

export default charactersSlice.reducer;
