import { useState, useCallback } from 'react'
import type { FavoriteCity } from '@/types/weather'
import { readFavorites, writeFavorites } from '@/utils/storage'
import { FAVORITES_LIMIT } from '@/constants/weather'

/**
 * 收藏城市 Hook（LocalStorage 持久化）
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>(() => readFavorites())

  // 检查是否已收藏
  const isFavorite = useCallback(
    (cityId: string) => {
      return favorites.some((f) => f.cityId === cityId)
    },
    [favorites]
  )

  // 添加收藏
  const addFavorite = useCallback(
    (city: Omit<FavoriteCity, 'addedAt'>) => {
      // 检查是否已存在
      if (favorites.some((f) => f.cityId === city.cityId)) {
        return { success: false, message: '该城市已在收藏中' }
      }

      // 检查是否超过上限
      if (favorites.length >= FAVORITES_LIMIT) {
        return { success: false, message: `最多收藏 ${FAVORITES_LIMIT} 个城市` }
      }

      const newFavorite: FavoriteCity = {
        ...city,
        addedAt: new Date().toISOString(),
      }

      const updated = [...favorites, newFavorite]
      const success = writeFavorites(updated)

      if (success) {
        setFavorites(updated)
        return { success: true, message: '收藏成功' }
      }

      return { success: false, message: '收藏失败，请检查浏览器存储权限' }
    },
    [favorites]
  )

  // 移除收藏
  const removeFavorite = useCallback(
    (cityId: string) => {
      const updated = favorites.filter((f) => f.cityId !== cityId)
      const success = writeFavorites(updated)

      if (success) {
        setFavorites(updated)
        return true
      }

      return false
    },
    [favorites]
  )

  // 清空收藏
  const clearFavorites = useCallback(() => {
    const success = writeFavorites([])
    if (success) {
      setFavorites([])
    }
  }, [])

  // 更新收藏城市的温度（用于列表展示）
  const updateTemperature = useCallback(
    (cityId: string, temperature: number) => {
      const updated = favorites.map((f) =>
        f.cityId === cityId ? { ...f, lastTemperature: temperature } : f
      )
      const success = writeFavorites(updated)
      if (success) {
        setFavorites(updated)
      }
    },
    [favorites]
  )

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    updateTemperature,
  }
}
