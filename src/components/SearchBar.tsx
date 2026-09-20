import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (city: string) => void
  popularCities: Array<{ cityId: string; city: string }>
  onCityClick: (cityId: string, city: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  popularCities,
  onCityClick,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim().replace(/[市区县]$/g, '')
    if (trimmed) {
      onSearch(trimmed)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="city-search" className="sr-only">
          搜索城市
        </label>
        <input
          id="city-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="输入城市名称，如：青岛、杭州"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all text-sm"
          aria-label="搜索城市"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="px-5 py-2.5 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
        >
          搜索
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs text-gray-500">热门：</span>
        {popularCities.map((item) => (
          <button
            key={item.cityId}
            onClick={() => onCityClick(item.cityId, item.city)}
            className="px-3 py-1.5 text-xs bg-sky-50 hover:bg-sky-100 rounded-full transition-colors text-sky-700 font-medium"
          >
            {item.city}
          </button>
        ))}
      </div>
    </div>
  )
}
