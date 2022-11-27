import { createSelector } from 'reselect'

export const globalOptionsSelector = ({ globalOptions }) => globalOptions || {}

export const optionSpeakEnabledSelector = createSelector(
  globalOptionsSelector,
  ({ speakEnabled }) => speakEnabled || false
)