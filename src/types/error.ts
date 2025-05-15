export interface AppError extends Error {
  message: string
  status?: number
}

export interface ErrorProps {
  message: string
  onRetry?: () => void
} 