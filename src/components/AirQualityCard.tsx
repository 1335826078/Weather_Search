import React from 'react'
import type { AirQuality as AirQualityType } from '@/types/weather'
import { AQI_CATEGORY_MAP } from '@/constants/weather'

interface AirQualityCardProps {
  airQuality: AirQualityType
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality }) => {
  const colors = AQI_CATEGORY_MAP[airQuality.category]

  return (
    <div className={`rounded-2xl p-5 ${colors.bg} ${colors.text} border ${colors.border} shadow-sm`}>
      <div className="flex flex-col items-center gap-4 text-center">
        {/* AQI 数值 + 等级 + PM2.5 */}
        <div>
          <p className="text-xs opacity-70 mb-1">空气质量指数</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold">AQI {airQuality.aqi}</span>
            <span className={`px-2 py-0.5 rounded-md text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
              {colors.label}
            </span>
          </div>
          <p className="text-sm opacity-70 mt-1.5">PM2.5: {airQuality.pm25}</p>
        </div>

        {/* 提示文案 */}
        <div className="max-w-md">
          <p className="text-sm leading-relaxed opacity-90">{airQuality.tips}</p>
        </div>
      </div>
    </div>
  )
}
