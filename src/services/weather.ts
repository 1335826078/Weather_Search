import type {
  WeatherApiRaw,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  WeatherAlarm,
} from '@/types/weather'
import {
  normalizeCurrentWeather,
  normalizeHourlyForecast,
  normalizeDailyForecast,
  normalizeAlarms,
} from '@/utils/weather'

const API_BASE = import.meta.env.VITE_WEATHER_API_BASE
const APPID = import.meta.env.VITE_WEATHER_APPID
const APPSECRET = import.meta.env.VITE_WEATHER_APPSECRET

if (!API_BASE || !APPID || !APPSECRET) {
  throw new Error('缺少天气 API 环境变量，请检查 .env.local 是否已按 .env.example 配置')
}

/**
 * 构建请求 URL
 */
function buildUrl(city: string): string {
  const params = new URLSearchParams({
    version: 'v63',
    appid: APPID,
    appsecret: APPSECRET,
    unescape: '1',
    vue: '1',
  })

  // 统一使用 city 参数，去掉市/区/县后缀
  const cleanCity = city.replace(/[市区县]$/g, '')
  params.set('city', cleanCity)

  // 开发环境使用代理，生产环境使用完整地址
  const baseUrl = API_BASE === '/' ? '/api' : `${API_BASE}`

  return `${baseUrl}?${params.toString()}`
}

/**
 * 错误码映射
 */
const ERROR_MESSAGES: Record<number, string> = {
  100: 'API 配置错误，请检查 appid',
  101: 'API 密钥错误，请检查 appsecret',
  102: '请求次数已达上限，请稍后再试',
  103: '当前账号无该城市查询权限',
}

/**
 * 天气 API 请求封装
 */
export async function fetchWeather(city: string): Promise<{
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  alarms: WeatherAlarm[]
}> {
  const url = buildUrl(city)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = (await response.json()) as WeatherApiRaw

    // 检查业务错误码
    if (data.errcode && data.errcode !== 0) {
      const message = ERROR_MESSAGES[data.errcode] || data.errmsg || '未知错误'
      throw new Error(message)
    }

    // 归一化数据
    const current = normalizeCurrentWeather(data)
    const hourly = data.hours ? normalizeHourlyForecast(data.hours) : []
    const daily = normalizeDailyForecast(data)
    const alarms = normalizeAlarms(data)

    return { current, hourly, daily, alarms }
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('请求超时，请检查网络后重试')
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error('网络异常，请检查网络后重试')
      }
    }

    throw error
  }
}
