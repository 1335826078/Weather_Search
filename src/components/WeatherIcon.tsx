import React from 'react'
import type { WeatherIconKey } from '@/types/weather'
import { WEATHER_ICON_MAP } from '@/constants/weather'

interface WeatherIconProps {
  icon: WeatherIconKey
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const WeatherIcon: React.FC<WeatherIconProps> = React.memo(
  ({ icon, size = 'md', className = '' }) => {
    const iconData = WEATHER_ICON_MAP[icon]
    const sizeClasses = {
      sm: 'text-3xl',
      md: 'text-4xl',
      lg: 'text-6xl',
    }

    return (
      <span
        className={`${sizeClasses[size]} ${className}`}
        aria-label={iconData.label}
        role="img"
      >
        {iconData.icon}
      </span>
    )
  }
)
