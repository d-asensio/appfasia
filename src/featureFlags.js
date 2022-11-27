export const featureFlags = (function IIFE () {
  const isEnabled = toggleName => process.env[`REACT_APP_FF_${toggleName}`] === 'true'

  return { isEnabled }
})()