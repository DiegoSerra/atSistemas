import { Http } from "@breakingbad/services/Http";
import { CharacterType } from "@breakingbad/types/Character.type";
import { QuoteType } from "@breakingbad/types/Quote.type";

export async function getAllCharacters(): Promise<CharacterType[]> {
  const result = await Http.get(`/characters`);
  return result?.data;
}

export async function getCharacterById(id: number): Promise<CharacterType> {
  const result = await Http.get(`/characters/${id}`);
  
  if (!result?.data?.length) {
    throw new Error('Not found');
  }

  return result?.data[0];
}

export async function getRandomQuoteByAuthor(name: string): Promise<QuoteType | undefined> {
  const result = await Http.get(`/quote/random?author=${name}`);
  
  if (!result?.data?.length) {
    return;
  }

  return result?.data[0];
}