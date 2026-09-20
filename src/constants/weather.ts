import type { WeatherIconKey, AqiCategory } from '@/types/weather'

// 天气图标映射（wea_img → 图标 + 背景渐变类名）
export const WEATHER_ICON_MAP: Record<
  WeatherIconKey,
  { icon: string; bg: string; label: string }
> = {
  qing: { icon: '☀️', bg: 'from-blue-400 to-blue-300', label: '晴' },
  yun: { icon: '☁️', bg: 'from-gray-300 to-gray-200', label: '多云' },
  yin: { icon: '☁️', bg: 'from-gray-400 to-gray-300', label: '阴' },
  yu: { icon: '🌧️', bg: 'from-blue-600 to-blue-500', label: '雨' },
  lei: { icon: '⛈️', bg: 'from-purple-600 to-purple-500', label: '雷' },
  xue: { icon: '❄️', bg: 'from-white to-gray-200', label: '雪' },
  wu: { icon: '🌫️', bg: 'from-gray-300 to-gray-200', label: '雾' },
  shachen: { icon: '🌪️', bg: 'from-yellow-500 to-yellow-400', label: '沙尘' },
  bingbao: { icon: '🌨️', bg: 'from-gray-400 to-gray-300', label: '冰雹' },
}

// AQI 等级映射（等级 → 配色类名）
export const AQI_CATEGORY_MAP: Record<
  AqiCategory,
  { bg: string; text: string; border: string; label: string }
> = {
  excellent: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', label: '优' },
  good: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', label: '良' },
  light: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', label: '轻度污染' },
  moderate: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: '中度污染' },
  heavy: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', label: '重度污染' },
  severe: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-300', label: '严重污染' },
}

// 热门城市
export const POPULAR_CITIES = [
  { cityId: '101010100', city: '北京', province: '北京' },
  { cityId: '101020100', city: '上海', province: '上海' },
  { cityId: '101280100', city: '广州', province: '广东' },
  { cityId: '101280601', city: '深圳', province: '广东' },
  { cityId: '101210100', city: '杭州', province: '浙江' },
  { cityId: '101270100', city: '成都', province: '四川' },
]

// 缓存时长（10 分钟）
export const CACHE_TTL = 10 * 60 * 1000

// 收藏城市上限
export const FAVORITES_LIMIT = 10

// LocalStorage key
export const STORAGE_KEY = 'weather-app:favorites'

// LocalStorage 版本
export const STORAGE_VERSION = 1
