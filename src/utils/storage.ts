import type { FavoriteCity } from '@/types/weather'
import { STORAGE_KEY, STORAGE_VERSION } from '@/constants/weather'

interface StoredData {
  version: number
  favorites: FavoriteCity[]
}

/**
 * LocalStorage 读取（带异常兜底）
 */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/**
 * LocalStorage 写入（带异常兜底）
 * @returns 是否写入成功
 */
export function writeStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    // QuotaExceededError: 配额满
    // SecurityError: 隐私模式禁用
    console.error('LocalStorage 写入失败:', error)
    return false
  }
}

/**
 * 读取 JSON 数据（带版本迁移预留）
 */
export function readJSON<T>(key: string, fallback: T): T {
  return readStorage<T>(key, fallback)
}

/**
 * 写入 JSON 数据
 */
export function writeJSON<T>(key: string, value: T): boolean {
  return writeStorage(key, value)
}

/**
 * 读取收藏城市（带版本检查）
 */
export function readFavorites(): FavoriteCity[] {
  const data = readStorage<StoredData | null>(STORAGE_KEY, null)
  if (!data) return []
  // 版本不匹配时清空
  if (data.version !== STORAGE_VERSION) {
    writeStorage(STORAGE_KEY, { version: STORAGE_VERSION, favorites: [] })
    return []
  }
  return data.favorites || []
}

/**
 * 写入收藏城市
 */
export function writeFavorites(favorites: FavoriteCity[]): boolean {
  return writeStorage<StoredData>(STORAGE_KEY, {
    version: STORAGE_VERSION,
    favorites,
  })
}
