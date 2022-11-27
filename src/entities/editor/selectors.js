import { createSelector } from 'reselect'
import { keys } from 'ramda'

const editorsByIdSelector = ({ editorsById }) => editorsById || {}

export const editorIdListSelector = createSelector(
  editorsByIdSelector,
  editorsById => keys(editorsById)
)
