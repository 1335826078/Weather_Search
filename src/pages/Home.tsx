import { useState } from 'react'
import { useWeather } from '@/hooks/useWeather'
import { useFavorites } from '@/hooks/useFavorites'
import { SearchBar } from '@/components/SearchBar'
import { CurrentWeather } from '@/components/CurrentWeather'
import { AirQualityCard } from '@/components/AirQualityCard'
import { HourlyForecast } from '@/components/HourlyForecast'
import { DailyForecast } from '@/components/DailyForecast'
import { AlarmBanner } from '@/components/AlarmBanner'
import { FavoriteCities } from '@/components/FavoriteCities'
import { ProgressBar } from '@/components/ProgressBar'
import { ErrorState } from '@/components/ErrorState'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { POPULAR_CITIES } from '@/constants/weather'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [removeConfirm, setRemoveConfirm] = useState<{ open: boolean; cityId?: string }>({
    open: false,
  })

  const { current, hourly, daily, alarms, loading, error, refresh, loadWeather } = useWeather()
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites()

  const handleSearch = (city: string) => {
    loadWeather(city)
    setSearchValue('')
  }

  const handlePopularCityClick = (_cityId: string, city: string) => {
    loadWeather(city)
  }

  const handleFavoriteClick = () => {
    if (!current) return
    if (isFavorite(current.cityId)) return

    const result = addFavorite({
      cityId: current.cityId,
      city: current.city,
      lastTemperature: current.temperature,
    })

    if (!result.success) {
      alert(result.message)
    }
  }

  const handleRemoveFavorite = (cityId: string) => {
    setRemoveConfirm({ open: true, cityId })
  }

  const confirmRemove = () => {
    if (removeConfirm.cityId) {
      removeFavorite(removeConfirm.cityId)
    }
    setRemoveConfirm({ open: false })
  }

  const handleCityClick = (cityId: string) => {
    const fav = favorites.find((f) => f.cityId === cityId)
    if (fav) {
      loadWeather(fav.city)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-blue-100 flex items-center justify-center">
      {/* 主容器 - 居中卡片 */}
      <div className="w-full max-w-4xl px-6">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sky-800">天气查询</h1>
          <p className="text-sky-600 mt-1">输入城市名称，查看实时天气</p>
        </div>

        {/* 搜索区 */}
        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
              popularCities={POPULAR_CITIES}
              onCityClick={handlePopularCityClick}
            />

            {/* 收藏城市 */}
            <FavoriteCities
              favorites={favorites}
              onCityClick={handleCityClick}
              onRemove={handleRemoveFavorite}
            />
          </div>
        </div>

        {/* 加载进度条 */}
        <ProgressBar loading={loading} />

        {/* 错误状态 */}
        {error && <ErrorState message={error} onRetry={refresh} />}

        {/* 主内容区 */}
        {current && !error && (
          <>
            {/* 气象预警 */}
            <AlarmBanner alarms={alarms} />

            {/* 当前天气卡片 */}
            <div className="relative mb-4 flex justify-center">
              <div className="w-full max-w-2xl">
                <CurrentWeather
                  data={current}
                  isFavorite={isFavorite(current.cityId)}
                  onToggleFavorite={handleFavoriteClick}
                />
              </div>
            </div>

            {/* 空气质量卡片 */}
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-2xl">
                <AirQualityCard airQuality={current.airQuality} />
              </div>
            </div>

            {/* 24 小时预报 */}
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-2xl">
                <HourlyForecast hourly={hourly} />
              </div>
            </div>

            {/* 7 天预报 */}
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-2xl">
                <DailyForecast daily={daily} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 移除确认弹窗 */}
      <ConfirmDialog
        open={removeConfirm.open}
        title="移除收藏"
        message="确定要移除这个收藏城市吗？"
        confirmText="移除"
        cancelText="取消"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveConfirm({ open: false })}
      />
    </div>
  )
}
