import React from 'react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div
      className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center shadow-sm"
      role="alert"
    >
      <p className="text-red-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-medium"
        >
          重试
        </button>
      )}
    </div>
  )
}
