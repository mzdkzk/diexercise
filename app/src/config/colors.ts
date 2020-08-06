export const colorSet = {
  primary: '#95D1BF',
  primaryDark: '#3ca08b',
  secondary: '#D1EAE2'
}

export default {
  text: '#001000',
  background: colorSet.secondary,
  scrollBar: {
    thumb: '#709E90',
    track: '#D5DBD5'
  },
  buttons: {
    default: colorSet.primary,
    text: '#f9f9fa',
    hover: colorSet.primaryDark,
    pressed: colorSet.primaryDark
  },
  dropup: {
    default: 'transparent',
    hover: 'rgba(1,1,1,0.1)',
    pressed: 'rgba(1,1,1,0.2)'
  },
  borders: {
    left: colorSet.secondary,
    right: colorSet.primary
  }
}
