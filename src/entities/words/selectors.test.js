import { wordCategoryIdListSelector } from './selectors'

describe('wordCategoryIdListSelector', () => {
  it('should return a list of category ids', () => {
    const state = {
      wordCategories: {
        aCategory: {},
        anotherCategory: {}
      }
    }

    const result = wordCategoryIdListSelector(state)

    expect(result).toStrictEqual([
      'aCategory',
      'anotherCategory'
    ])
  })

  it('should return an empty list when the state is empty', () => {
    const state = {}

    const result = wordCategoryIdListSelector(state)

    expect(result).toStrictEqual([])
  })
})