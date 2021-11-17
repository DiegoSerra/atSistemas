import reducer, { setCharactersSearchText } from './charactersSlice'

test('should handle a search text', () => {
  expect(reducer(undefined, setCharactersSearchText({target: {value:'Run the tests'}}))).toEqual(
    {
      entities: {},
      ids: [],
      searchText: 'Run the tests'
    }
  )
})