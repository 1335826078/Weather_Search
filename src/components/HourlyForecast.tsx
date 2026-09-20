import React from 'react'
import type { HourlyForecast as HourlyForecastType } from '@/types/weather'
import { WeatherIcon } from './WeatherIcon'

interface HourlyForecastProps {
  hourly: HourlyForecastType[]
}

export const HourlyForecast: React.FC<HourlyForecastProps> = React.memo(({ hourly }) => {
  if (!hourly || hourly.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
        <span>🕐</span> 逐时预报
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {hourly.slice(0, 8).map((item) => (
          <div
            key={item.time}
            className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors min-w-[72px]"
          >
            <p className="text-xs text-gray-500 mb-1.5">{item.time}</p>
            <WeatherIcon icon={item.weatherIcon} size="sm" className="mb-1.5" />
            <p className="text-sm font-semibold text-gray-800">{item.temperature}°</p>
            <p className="text-xs text-gray-400 mt-0.5">{item.windScale}</p>
          </div>
        ))}
      </div>
    </div>
  )
})
