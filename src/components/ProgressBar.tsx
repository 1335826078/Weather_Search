import React from 'react'

interface ProgressBarProps {
  loading: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ loading }) => {
  if (!loading) return null

  return (
    <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
      <div className="h-full bg-sky-500 animate-pulse w-full origin-left" />
    </div>
  )
}
