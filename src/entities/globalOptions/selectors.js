import { createSelector } from 'reselect'

const globalOptionsSelector = ({ globalOptions }) => globalOptions || {}

export const optionSpeakEnabledSelector = createSelector(
  globalOptionsSelector,
  ({ speakEnabled }) => speakEnabled || false
)