import { createSelector } from 'reselect'
import { keys } from 'ramda'
import { createCachedSelector } from 're-reselect'

export const currentEditorSelector = ({ currentEditor }) => currentEditor || null

const editorsByIdSelector = ({ editorsById }) => editorsById || {}

export const editorIdListSelector = createSelector(
  editorsByIdSelector,
  editorsById => keys(editorsById)
)

const editorIdParam = (_, editorId) => editorId

export const editorByIdSelector = createCachedSelector(
  editorIdParam,
  editorsByIdSelector,
  (editorId, editorsById) => editorsById[editorId] || null
)(
  editorIdParam
)
