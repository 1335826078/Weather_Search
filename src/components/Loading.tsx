import React from 'react'

interface LoadingProps {
  message?: string
}

export const Loading: React.FC<LoadingProps> = ({ message = '加载中...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-gray-500 text-sm">{message}</p>
    </div>
  )
}
