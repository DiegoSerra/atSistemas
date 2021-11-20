import { getCharacterById, getDeathByAuthor, getRandomQuoteByAuthor } from '@breakingbad/services/Character';
import { CharacterType } from '@breakingbad/types/Character.type';
import { DeathType } from '@breakingbad/types/Death.type';
import { QuoteType } from '@breakingbad/types/Quote.type';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const getCharacter = createAsyncThunk('character/getCharacter', async (id: number): Promise<CharacterType> => await getCharacterById(id));
export const getRandomQuote = createAsyncThunk('character/getRandomQuoteByAuthor', async (name: string): Promise<QuoteType | undefined> => await getRandomQuoteByAuthor(name));
export const getDeath = createAsyncThunk('character/getDeath', async (name: string): Promise<DeathType | undefined> => await getDeathByAuthor(name));

export type CharacterContext = {
	value: CharacterType | null,
	quote?: QuoteType,
	death?: DeathType
}

const initialState: CharacterContext = {
	value: null
}

const characterSlice = createSlice({
	name: 'character',
	initialState,
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
			.addCase(getDeath.fulfilled, (state: CharacterContext, action: PayloadAction<DeathType | undefined>) => {
				state.death = action.payload;
			})
			.addCase(getDeath.rejected, (state: CharacterContext) => {
				state.death = undefined;
			})
  },
});

export const { resetCharacter } = characterSlice.actions;

export default characterSlice.reducer;
