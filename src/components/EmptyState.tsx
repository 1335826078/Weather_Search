import React from 'react'

interface EmptyStateProps {
  message?: string
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = '暂无数据',
  action,
}) => {
  return (
    <div className="bg-white/50 rounded-xl p-8 text-center">
      <p className="text-gray-500 mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
