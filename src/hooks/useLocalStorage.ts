import { useState, useEffect } from 'react'
import { readStorage, writeStorage } from '@/utils/storage'

/**
 * LocalStorage 通用读写 Hook
 * @param key 存储键名
 * @param initialValue 初始值
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return readStorage<T>(key, initialValue)
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 支持函数式更新
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      const success = writeStorage(key, valueToStore)
      if (!success) {
        console.warn(`LocalStorage 写入失败：${key}`)
      }
    } catch (error) {
      console.error(`LocalStorage 操作失败：${key}`, error)
    }
  }

  // 监听其他标签页的变更
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch {
          // 解析失败，保持原值
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue] as const
}
