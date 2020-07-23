export const colorSet = {
  primary: '#94cfbe',
  primaryDark: '#3ca08b',
  secondary: '#cfe8e1'
}

export default {
  text: '#001000',
  background: colorSet.secondary,
  buttons: {
    default: colorSet.primary,
    text: '#f9f9fa',
    hover: colorSet.primaryDark,
    pressed: colorSet.primaryDark
  },
  controls: {
    default: 'transparent',
    pressed: 'rgba(1,1,1,0.2)'
  },
  borders: {
    left: colorSet.secondary,
    right: colorSet.primary
  }
}
