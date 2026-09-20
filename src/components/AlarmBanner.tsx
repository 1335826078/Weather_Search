import React from 'react'
import type { WeatherAlarm as WeatherAlarmType } from '@/types/weather'

interface AlarmBannerProps {
  alarms: WeatherAlarmType[]
}

export const AlarmBanner: React.FC<AlarmBannerProps> = ({ alarms }) => {
  if (!alarms || alarms.length === 0) {
    return null
  }

  const getLevelColor = (level: string) => {
    if (level.includes('红')) return 'bg-red-500'
    if (level.includes('橙')) return 'bg-orange-500'
    if (level.includes('黄')) return 'bg-yellow-500'
    if (level.includes('蓝')) return 'bg-blue-500'
    return 'bg-gray-500'
  }

  return (
    <div className="mb-4 space-y-2" role="alert">
      {alarms.map((alarm, index) => (
        <div
          key={index}
          className={`${getLevelColor(alarm.level)} text-white px-5 py-4 rounded-2xl flex items-start gap-4 shadow-lg`}
        >
          <span className="text-2xl flex-shrink-0" aria-hidden="true">
            ⚠️
          </span>
          <div className="flex-1">
            <p className="font-semibold text-base">
              {alarm.type}预警 - {alarm.level}
            </p>
            <p className="text-sm opacity-90 mt-2 leading-relaxed">{alarm.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
