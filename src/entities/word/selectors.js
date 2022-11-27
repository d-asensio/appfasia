import { createSelector } from 'reselect'
import { createCachedSelector } from 're-reselect'

import { keys } from 'ramda'

const wordCategoriesSelector = ({ wordCategories }) => wordCategories || {}

export const wordCategoryIdListSelector = createSelector(
  wordCategoriesSelector,
  wordCategories => keys(wordCategories)
)

const categoryIdParameter = (_, categoryId) => categoryId

export const wordCategoryByIdSelector = createCachedSelector(
  categoryIdParameter,
  wordCategoriesSelector,
  (categoryId, wordCategories) => wordCategories[categoryId] || null
)(
  categoryIdParameter
)

const wordsByCategoryIdSelector = ({ wordsByCategoryId }) => wordsByCategoryId || {}

export const wordListByCategoryIdSelector = createCachedSelector(
  categoryIdParameter,
  wordsByCategoryIdSelector,
  (categoryId, wordsByCategoryId) => wordsByCategoryId[categoryId] || null
)(
  categoryIdParameter
)
