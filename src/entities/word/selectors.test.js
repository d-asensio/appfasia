import { wordCategoryByIdSelector, wordCategoryIdListSelector, wordListByCategoryIdSelector } from './selectors'

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

describe('wordCategoryByIdSelector', () => {
  it('should return the data of a category given its id', () => {
    const categoryData = {
      name: 'A Category',
      color: '#fff'
    }

    const state = {
      wordCategories: {
        aCategory: categoryData
      }
    }

    const result = wordCategoryByIdSelector(state, 'aCategory')

    expect(result).toStrictEqual(categoryData)
  })

  it('should return null when the provided id does not belong to any category', () => {
    const state = {}

    const result = wordCategoryByIdSelector(state, 'aUnknownCategory')

    expect(result).toEqual(null)
  })
})

describe('wordListByCategoryIdSelector', () => {
  it('should return the words of a category given its id', () => {
    const categoryWords = [
      'a word',
      'another word'
    ]

    const state = {
      wordsByCategoryId: {
        aCategory: categoryWords
      }
    }

    const result = wordListByCategoryIdSelector(state, 'aCategory')

    expect(result).toStrictEqual(categoryWords)
  })

  it('should return null when the provided id does not belong to any category', () => {
    const state = {}

    const result = wordListByCategoryIdSelector(state, 'aUnknownCategory')

    expect(result).toEqual(null)
  })
})