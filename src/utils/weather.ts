import type {
  WeatherApiRaw,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  WeatherAlarm,
  AirQuality,
  WeatherIconKey,
} from '@/types/weather'
import { getAqiCategory, formatTemperature, formatHumidity } from './format'

/**
 * 天气图标映射（wea_img → WeatherIconKey）
 * API 返回的是拼音字符串：qing / yun / yin / yu / lei / xue / wu / shachen / bingbao
 */
const WEATHER_ICON_MAP: Record<string, WeatherIconKey> = {
  // 拼音（主要）
  qing: 'qing',
  yun: 'yun',
  yin: 'yin',
  yu: 'yu',
  lei: 'lei',
  xue: 'xue',
  wu: 'wu',
  shachen: 'shachen',
  bingbao: 'bingbao',
  // 中文（兜底）
  晴: 'qing',
  云: 'yun',
  阴: 'yin',
  雨: 'yu',
  雷: 'lei',
  雪: 'xue',
  雾: 'wu',
  沙尘: 'shachen',
  冰雹: 'bingbao',
}

/**
 * 将 wea_img 映射为 WeatherIconKey
 */
export function normalizeWeatherIcon(icon: string): WeatherIconKey {
  return WEATHER_ICON_MAP[icon] || 'yun'
}

/**
 * 归一化空气质量
 */
export function normalizeAirQuality(raw: WeatherApiRaw): AirQuality {
  const aqi = Number(raw.air) || 0
  const pm25 = Number(raw.air_pm25) || 0
  const level = raw.air_level || ''
  const tips = raw.air_tips || ''
  const category = getAqiCategory(aqi, level)

  return { aqi, pm25, level, tips, category }
}

/**
 * 归一化当前天气
 */
export function normalizeCurrentWeather(raw: WeatherApiRaw): CurrentWeather {
  return {
    cityId: raw.cityid,
    city: raw.city,
    country: raw.country,
    date: raw.date,
    week: raw.week,
    updatedAt: raw.update_time,
    weather: raw.wea,
    weatherIcon: normalizeWeatherIcon(raw.wea_img),
    temperature: formatTemperature(raw.tem) || 0,
    high: formatTemperature(raw.tem1) || 0,
    low: formatTemperature(raw.tem2) || 0,
    windDirection: raw.win,
    windScale: raw.win_speed,
    windSpeed: raw.win_meter,
    humidity: formatHumidity(raw.humidity),
    visibility: raw.visibility,
    pressure: raw.pressure,
    airQuality: normalizeAirQuality(raw),
  }
}

/**
 * 归一化逐小时预报
 */
export function normalizeHourlyForecast(rawHours: import('@/types/weather').RawHourly[]): HourlyForecast[] {
  return rawHours.map((hour) => ({
    time: hour.hours,
    weather: hour.wea,
    weatherIcon: normalizeWeatherIcon(hour.wea_img),
    temperature: formatTemperature(hour.tem) || 0,
    windDirection: hour.win,
    windScale: hour.win_speed,
  }))
}

/**
 * 归一化每日预报
 */
export function normalizeDailyForecast(_raw: WeatherApiRaw): DailyForecast[] {
  // v63 版本返回的是 days 数组还是需要从其他字段推导
  // 这里假设 API 返回中包含多日数据（实际可能需要根据 API 文档调整）
  // 暂时返回空数组，等待实际 API 响应结构调整
  return []
}

/**
 * 归一化气象预警（兼容对象或数组）
 */
export function normalizeAlarms(raw: WeatherApiRaw): WeatherAlarm[] {
  if (!raw.alarm) return []

  const alarms = Array.isArray(raw.alarm) ? raw.alarm : [raw.alarm]
  return alarms.map((alarm) => ({
    type: alarm.alarm_type,
    level: alarm.alarm_level,
    content: alarm.alarm_content,
  }))
}
