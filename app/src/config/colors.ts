export const colorSet = {
  primary: '#95D1BF',
  primaryDark: '#3ca08b',
  secondary: '#D1EAE2'
}

export default {
  text: {
    default: '#001000',
    bold: '#709E90',
    detail: 'rgba(0,0,0,0.8)'
  },
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
