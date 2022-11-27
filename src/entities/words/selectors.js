import { createSelector } from 'reselect'
import { createCachedSelector } from 're-reselect'

import { keys } from 'ramda'

const wordCategoriesSelector = ({ wordCategories }) => wordCategories || {}

export const wordCategoryIdListSelector = createSelector(
  wordCategoriesSelector,
  wordCategories => keys(wordCategories)
)


export const wordCategoryById = () => ({ id: '', name: '', color: '#fff' })

export const wordListByCategoryId = () => []
