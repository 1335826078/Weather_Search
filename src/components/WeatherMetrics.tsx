import React from 'react'
import type { CurrentWeather } from '@/types/weather'

interface WeatherMetricsProps {
  data: CurrentWeather
}

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      <div className="bg-white/70 rounded-xl p-3 text-center backdrop-blur-sm">
        <p className="text-xs text-gray-500 mb-1">湿度</p>
        <p className="text-lg font-semibold text-gray-800">{data.humidity}</p>
      </div>
      <div className="bg-white/70 rounded-xl p-3 text-center backdrop-blur-sm">
        <p className="text-xs text-gray-500 mb-1">能见度</p>
        <p className="text-lg font-semibold text-gray-800">{data.visibility}</p>
      </div>
      <div className="bg-white/70 rounded-xl p-3 text-center backdrop-blur-sm">
        <p className="text-xs text-gray-500 mb-1">气压</p>
        <p className="text-lg font-semibold text-gray-800">{data.pressure} hPa</p>
      </div>
      <div className="bg-white/70 rounded-xl p-3 text-center backdrop-blur-sm">
        <p className="text-xs text-gray-500 mb-1">风向风力</p>
        <p className="text-lg font-semibold text-gray-800">
          {data.windDirection} {data.windScale}
        </p>
      </div>
    </div>
  )
}
