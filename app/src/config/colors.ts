export const colorSet = {
  primary: '#95D1BF',
  primaryDark: '#3ca08b',
  secondary: '#D1EAE2'
}

export default {
  text: '#001000',
  background: colorSet.secondary,
  scrollBar: {
    thumb: colorSet.primary,
    track: 'rgba(0, 0, 0, 0.4)'
  },
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
