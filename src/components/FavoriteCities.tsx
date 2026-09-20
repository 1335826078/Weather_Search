import React from 'react'
import type { FavoriteCity as FavoriteCityType } from '@/types/weather'

interface FavoriteCitiesProps {
  favorites: FavoriteCityType[]
  onCityClick: (cityId: string) => void
  onRemove: (cityId: string) => void
}

export const FavoriteCities: React.FC<FavoriteCitiesProps> = ({
  favorites,
  onCityClick,
  onRemove,
}) => {
  if (!favorites || favorites.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      <span className="text-sm text-gray-500">我的收藏：</span>
      {favorites.map((item) => (
        <div
          key={item.cityId}
          className="group flex items-center gap-2 bg-white hover:bg-sky-50 rounded-full pl-3 pr-2 py-1.5 transition-colors cursor-pointer border border-gray-200"
          onClick={() => onCityClick(item.cityId)}
        >
          <span className="text-sm text-gray-700 font-medium">{item.city}</span>
          {item.lastTemperature !== undefined && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.lastTemperature}°</span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove(item.cityId)
            }}
            className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all"
            aria-label={`移除 ${item.city}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
