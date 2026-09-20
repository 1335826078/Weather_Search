/**
 * 格式化温度（四舍五入取整）
 */
export function formatTemperature(value: string | number): number | null {
  const num = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(num)) return null
  return Math.round(num)
}

/**
 * 格式化湿度（确保带 % 符号）
 */
export function formatHumidity(value: string): string {
  if (value.endsWith('%')) return value
  return `${value}%`
}

/**
 * 格式化日期（YYYY-MM-DD → MM/DD）
 */
export function formatDateShort(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${month}/${day}`
}

/**
 * 格式化星期（星期 X → 周 X）
 */
export function formatWeek(week: string): string {
  return week.replace('星期', '周')
}

/**
 * 格式化时间（HH:MM → HH:MM）
 */
export function formatTime(timeStr: string): string {
  return timeStr
}

/**
 * 判断 AQI 等级
 */
export function getAqiCategory(aqi: number, level: string): import('@/types/weather').AqiCategory {
  // 优先使用 API 返回的 level 字段
  if (level.includes('优')) return 'excellent'
  if (level.includes('良')) return 'good'
  if (level.includes('轻度')) return 'light'
  if (level.includes('中度')) return 'moderate'
  if (level.includes('重度')) return 'heavy'
  if (level.includes('严重')) return 'severe'

  // 兜底：根据 AQI 数值判断
  if (aqi <= 50) return 'excellent'
  if (aqi <= 100) return 'good'
  if (aqi <= 150) return 'light'
  if (aqi <= 200) return 'moderate'
  if (aqi <= 300) return 'heavy'
  return 'severe'
}

/**
 * 计算温度区间百分比
 */
export function calculateTemperaturePercent(
  temp: number,
  min: number,
  max: number
): number {
  if (max === min) return 50
  const percent = ((temp - min) / (max - min)) * 100
  return Math.max(0, Math.min(100, percent))
}

/**
 * 去除城市后缀（市/区/县）
 */
export function normalizeCityName(city: string): string {
  return city.replace(/[市区县]$/g, '')
}
