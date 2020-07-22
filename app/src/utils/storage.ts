import { useState } from 'react'

// https://usehooks.com/useLocalStorage/
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    }
    return defaultValue
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
