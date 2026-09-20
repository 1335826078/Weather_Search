import { useState } from 'react'

interface FavoriteButtonProps {
  current: { cityId: string } | null
  isFavorite: boolean
  onAdd: () => void
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  current,
  isFavorite,
  onAdd,
}) => {
  const [showTip, setShowTip] = useState(false)

  const handleClick = () => {
    if (isFavorite || !current) return
    onAdd()
    setShowTip(true)
    setTimeout(() => setShowTip(false), 2000)
  }

  if (!current) return null

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isFavorite}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
          isFavorite
            ? 'bg-yellow-400 text-white cursor-default shadow-md'
            : 'bg-white/20 hover:bg-white/30 text-white'
        }`}
        aria-label={isFavorite ? '已在收藏中' : '加入收藏'}
      >
        <span className="text-xl">{isFavorite ? '★' : '☆'}</span>
      </button>
      {showTip && (
        <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-white text-sky-600 text-sm rounded-full whitespace-nowrap shadow-lg">
          收藏成功
        </div>
      )}
    </div>
  )
}
