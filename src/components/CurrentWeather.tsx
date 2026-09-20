import React from 'react'
import type { CurrentWeather as CurrentWeatherType } from '@/types/weather'
import { WEATHER_ICON_MAP } from '@/constants/weather'

interface CurrentWeatherProps {
  data: CurrentWeatherType
  isFavorite: boolean
  onToggleFavorite: () => void
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isFavorite, onToggleFavorite }) => {
  const iconData = WEATHER_ICON_MAP[data.weatherIcon]

  return (
    <div className="rounded-3xl p-6 bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl relative overflow-hidden">
      {/* 收藏按钮 - 放在卡片内部右上角 */}
      <button
        onClick={onToggleFavorite}
        disabled={isFavorite}
        className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-all z-10 ${
          isFavorite
            ? 'bg-yellow-400 text-white cursor-default'
            : 'bg-white/20 hover:bg-white/30 text-white'
        }`}
        aria-label={isFavorite ? '已在收藏中' : '加入收藏'}
      >
        <span className="text-lg">{isFavorite ? '★' : '☆'}</span>
      </button>

      {/* 顶部：城市名 + 更新时间 - 居中显示 */}
      <div className="flex flex-col items-center justify-center mb-4 pb-4 border-b border-white/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{data.city}</h2>
          <p className="text-sm opacity-80 mt-0.5">{data.country}</p>
        </div>
        <div className="text-center text-xs opacity-70 mt-1">
          <p>{data.date} {data.week}</p>
          <p>更新于 {data.updatedAt}</p>
        </div>
      </div>

      {/* 中部：天气图标 + 温度 */}
      <div className="flex items-center justify-center gap-8 mb-5">
        <div className="flex items-center gap-3">
          <span className="text-6xl" aria-hidden="true">
            {iconData.icon}
          </span>
          <div className="text-left">
            <p className="text-lg font-medium">{data.weather}</p>
            <p className="text-sm opacity-70">{iconData.label}</p>
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-start justify-center">
            <span className="text-6xl font-light">{data.temperature}</span>
            <span className="text-2xl mt-1">°</span>
          </div>
          <p className="text-sm opacity-80 mt-1">
            高 {data.high}° 低 {data.low}°
          </p>
        </div>
      </div>

      {/* 底部：气象指标网格 */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
          <p className="text-xs opacity-60 mb-0.5">湿度</p>
          <p className="font-semibold text-sm">{data.humidity}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
          <p className="text-xs opacity-60 mb-0.5">能见度</p>
          <p className="font-semibold text-sm">{data.visibility}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
          <p className="text-xs opacity-60 mb-0.5">气压</p>
          <p className="font-semibold text-sm">{data.pressure}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
          <p className="text-xs opacity-60 mb-0.5">风</p>
          <p className="font-semibold text-sm">{data.windDirection}</p>
          <p className="text-xs opacity-70">{data.windScale}</p>
        </div>
      </div>
    </div>
  )
}
