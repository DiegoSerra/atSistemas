import { getAllCharacters, getCharacterById, getRandomQuoteByAuthor } from './character';
import { Http } from '../Http';

describe('character serveice', () => {
  
  const mock = jest.spyOn(Http, 'get');
  
  test('will properly return the characters', async () => {
    mock.mockImplementation(() => Promise.resolve({ data: [] }));
    const result = await getAllCharacters();
    expect(result).toEqual([]);
  });

  describe('will properly return', () => {

    test('the character if exists', async () => {
      mock.mockImplementation(() => Promise.resolve({ data: [{}] }));
      const result = await getCharacterById(1);
  
      expect(result).toEqual({});
    });

    test('an error if not exists', async () => {
      mock.mockImplementation(() => Promise.resolve({ data: [] }));
      let error;
      try {
        await getCharacterById(1);
      } catch (e) {
        error = e;
      }
  
      expect(error).toBeDefined();
    });
  });

  test('will properly return the random quote', async () => {
    mock.mockImplementation(() => Promise.resolve({ data: [{}] }));
    const result = await getRandomQuoteByAuthor('test');
    expect(result).toEqual({});
  });
});