import { useState, useEffect, useCallback, useRef } from 'react'
import type { CurrentWeather, HourlyForecast, DailyForecast, WeatherAlarm } from '@/types/weather'
import { fetchWeather } from '@/services/weather'
import { CACHE_TTL } from '@/constants/weather'

interface CacheData {
  data: {
    current: CurrentWeather
    hourly: HourlyForecast[]
    daily: DailyForecast[]
    alarms: WeatherAlarm[]
  }
  fetchedAt: number
}

/**
 * 天气数据 Hook（拉取 + 缓存 + 加载态 / 错误态 / 重试）
 */
export function useWeather(initialCity?: string, _initialCityId?: string) {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [hourly, setHourly] = useState<HourlyForecast[]>([])
  const [daily, setDaily] = useState<DailyForecast[]>([])
  const [alarms, setAlarms] = useState<WeatherAlarm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 缓存引用（内存缓存，不落 LocalStorage）
  const cacheRef = useRef<Map<string, CacheData>>(new Map())
  const controllerRef = useRef<AbortController | null>(null)
  const lastCityRef = useRef<string>('北京') // 记录最近请求的城市

  /**
   * 加载天气数据
   */
  const loadWeather = useCallback(
    async (city: string, forceRefresh = false) => {
      // 去掉市/区/县后缀
      const cleanCity = city.replace(/[市区县]$/g, '')
      const cacheKey = cleanCity

      // 取消在途请求
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
      controllerRef.current = new AbortController()

      // 检查缓存（非强制刷新时）
      if (!forceRefresh) {
        const cached = cacheRef.current.get(cacheKey)
        if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
          setCurrent(cached.data.current)
          setHourly(cached.data.hourly)
          setDaily(cached.data.daily)
          setAlarms(cached.data.alarms)
          setLoading(false)
          setError(null)
          return
        }
      }

      setLoading(true)
      setError(null)

      try {
        const data = await fetchWeather(cleanCity)

        // 更新缓存和最近请求的城市
        cacheRef.current.set(cacheKey, {
          data,
          fetchedAt: Date.now(),
        })
        lastCityRef.current = cleanCity

        setCurrent(data.current)
        setHourly(data.hourly)
        setDaily(data.daily)
        setAlarms(data.alarms)
        setError(null)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('未知错误')
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * 刷新数据（强制刷新）
   */
  const refresh = useCallback(() => {
    const city = lastCityRef.current || '北京'
    loadWeather(city, true)
  }, [loadWeather])

  // 初始加载
  useEffect(() => {
    loadWeather(initialCity || '北京')

    // 清理函数：组件卸载时取消请求
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    current,
    hourly,
    daily,
    alarms,
    loading,
    error,
    refresh,
    loadWeather,
  }
}
