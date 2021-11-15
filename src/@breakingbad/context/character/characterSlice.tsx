import { getCharacterById, getRandomQuoteByAuthor } from '@breakingbad/services/Character';
import { CharacterType } from '@breakingbad/types/Character.type';
import { QuoteType } from '@breakingbad/types/Quote.type';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const getCharacter = createAsyncThunk('character/getCharacter', async (id: number): Promise<CharacterType> => await getCharacterById(id));
export const getRandomQuote = createAsyncThunk('character/getRandomQuoteByAuthor', async (name: string): Promise<QuoteType | undefined> => await getRandomQuoteByAuthor(name));

export type CharacterContext = {
	value: CharacterType | null,
	quote?: QuoteType
}

const characterSlice = createSlice({
	name: 'character',
	initialState: {
		value: null
	},
	reducers: {
		resetCharacter: () => ({ value: null })
	},
	extraReducers: (builder) => {
    builder
			.addCase(getCharacter.fulfilled, (state: CharacterContext, action: PayloadAction<CharacterType>) => {
				state.value = action.payload;
			})
			.addCase(getCharacter.rejected, (state: CharacterContext) => {
				state.value = null;
			})
			.addCase(getRandomQuote.fulfilled, (state: CharacterContext, action: PayloadAction<QuoteType | undefined>) => {
				state.quote = action.payload;
			})
			.addCase(getRandomQuote.rejected, (state: CharacterContext) => {
				state.quote = undefined;
			})
  },
});

export const { resetCharacter } = characterSlice.actions;

export default characterSlice.reducer;
