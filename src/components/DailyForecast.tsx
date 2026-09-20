import React from 'react'
import type { DailyForecast as DailyForecastType } from '@/types/weather'
import { WeatherIcon } from './WeatherIcon'
import { formatDateShort } from '@/utils/format'

interface DailyForecastProps {
  daily: DailyForecastType[]
}

export const DailyForecast: React.FC<DailyForecastProps> = React.memo(({ daily }) => {
  if (!daily || daily.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center text-gray-500 shadow-sm border border-gray-100">
        暂无天气预报数据
      </div>
    )
  }

  // 计算 7 天的温度极值，用于温度条
  const temps = daily.flatMap((d) => [d.high, d.low])
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)
  const tempRange = maxTemp - minTemp || 1

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
        <span>📅</span> 7 天预报
      </h3>
      <div className="space-y-2">
        {daily.map((day, index) => {
          // 计算温度条的位置和宽度
          const lowPercent = ((day.low - minTemp) / tempRange) * 100
          const highPercent = ((day.high - minTemp) / tempRange) * 100
          const barWidth = highPercent - lowPercent
          const isToday = index === 0

          return (
            <div
              key={day.date}
              className={`flex items-center gap-4 py-2.5 px-3 rounded-xl ${isToday ? 'bg-sky-50 border border-sky-100' : 'hover:bg-gray-50'}`}
            >
              {/* 日期 */}
              <div className="w-16 flex-shrink-0">
                <p className={`text-sm font-medium ${isToday ? 'text-sky-600' : 'text-gray-800'}`}>
                  {isToday ? '今天' : day.week.replace('星期', '')}
                </p>
                <p className="text-xs text-gray-400">{formatDateShort(day.date)}</p>
              </div>

              {/* 天气图标和文字 */}
              <div className="flex items-center gap-2 flex-1">
                <WeatherIcon icon={day.dayIcon} size="sm" />
                <span className="text-sm text-gray-600">{day.dayWeather}</span>
              </div>

              {/* 温度条 */}
              <div className="w-24 hidden sm:block">
                <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                    style={{
                      left: `${lowPercent}%`,
                      width: `${Math.max(barWidth, 8)}%`,
                    }}
                  />
                </div>
              </div>

              {/* 温度 */}
              <div className="w-20 text-right flex-shrink-0">
                <p className="text-sm font-medium text-gray-800">
                  {day.high}° / {day.low}°
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
