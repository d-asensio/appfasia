import { createSelector } from 'reselect'
import { createCachedSelector } from 're-reselect'

import { keys } from 'ramda'

const wordCategoriesSelector = ({ wordCategories }) => wordCategories || {}

export const wordCategoryIdListSelector = createSelector(
  wordCategoriesSelector,
  wordCategories => keys(wordCategories)
)

const categoryIdParameter = (_, categoryId) => categoryId

export const wordCategoryById = createCachedSelector(
  categoryIdParameter,
  wordCategoriesSelector,
  (categoryId, wordCategories) => wordCategories[categoryId] || null
)(
  categoryIdParameter
)

export const wordListByCategoryId = () => []
