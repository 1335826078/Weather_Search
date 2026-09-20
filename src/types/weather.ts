// 天气图标枚举
export type WeatherIconKey =
  | 'qing' // 晴
  | 'yun' // 云
  | 'yin' // 阴
  | 'yu' // 雨
  | 'lei' // 雷
  | 'xue' // 雪
  | 'wu' // 雾
  | 'shachen' // 沙尘
  | 'bingbao' // 冰雹

// AQI 等级枚举
export type AqiCategory = 'excellent' | 'good' | 'light' | 'moderate' | 'heavy' | 'severe'

// 空气质量
export interface AirQuality {
  aqi: number // air
  pm25: number // air_pm25
  level: string // air_level，如 '优'
  tips: string // air_tips
  category: AqiCategory // 归一化等级，用于配色
}

// 当前天气（归一化后）
export interface CurrentWeather {
  cityId: string
  city: string
  country: string
  date: string // date，如 '2026-09-15'
  week: string // week，如 '星期二'
  updatedAt: string // update_time，如 '16:09'
  weather: string // wea，如 '晴'
  weatherIcon: WeatherIconKey // wea_img 归一化
  temperature: number // tem，实况温度
  high: number // tem1，白天高温
  low: number // tem2，夜间低温
  windDirection: string // win，如 '西南风'
  windScale: string // win_speed，如 '3 级'
  windSpeed: string // win_meter，如 '19km/h'
  humidity: string // humidity，如 '38%'
  visibility: string // visibility，如 '9km'
  pressure: string // pressure，如 '1010'
  airQuality: AirQuality
}

// 逐小时预报
export interface HourlyForecast {
  time: string // hours，如 '20 时'
  weather: string
  weatherIcon: WeatherIconKey
  temperature: number
  windDirection: string
  windScale: string
}

// 每日预报
export interface DailyForecast {
  date: string // 如 '2026-09-15'
  week: string // 如 '星期二'
  dayWeather: string // 白天天气
  nightWeather: string // 夜间天气
  dayIcon: WeatherIconKey
  nightIcon: WeatherIconKey
  high: number // tem1
  low: number // tem2
  dayWind: string
  dayWindScale: string
  nightWind: string
  nightWindScale: string
  airQuality?: AirQuality
}

// 气象预警
export interface WeatherAlarm {
  type: string // alarm_type，如 '暴雨'
  level: string // alarm_level，如 '橙色'
  content: string // alarm_content
}

// 收藏城市
export interface FavoriteCity {
  cityId: string
  city: string
  province?: string
  addedAt: string // ISO 字符串
  lastTemperature?: number // 最近一次查询到的温度，用于列表展示
}

// API 原始响应（v63，字段全为字符串）
export interface WeatherApiRaw {
  cityid: string
  date: string
  week: string
  update_time: string
  city: string
  cityEn?: string
  country: string
  countryEn?: string
  wea: string
  wea_img: string
  tem: string
  tem1: string
  tem2: string
  win: string
  win_speed: string
  win_meter: string
  humidity: string
  visibility: string
  pressure: string
  air: string
  air_pm25: string
  air_level: string
  air_tips: string
  hours?: RawHourly[]
  alarm?: RawAlarm[] | RawAlarm // 可能是对象或数组
  errcode?: number
  errmsg?: string
  [key: string]: unknown
}

export interface RawHourly {
  hours: string
  tem: string
  win: string
  win_speed: string
  wea: string
  wea_img: string
}

export interface RawAlarm {
  alarm_type: string
  alarm_level: string
  alarm_content: string
}

// Hook 结构
export interface UseWeatherResult {
  current: CurrentWeather | null
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  alarms: WeatherAlarm[]
  loading: boolean
  error: string | null
  refresh: () => void
}

export interface UseFavoritesResult {
  favorites: FavoriteCity[]
  isFavorite: (cityId: string) => boolean
  addFavorite: (city: Omit<FavoriteCity, 'addedAt'>) => void
  removeFavorite: (cityId: string) => void
  clearFavorites: () => void
}
