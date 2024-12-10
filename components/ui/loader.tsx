import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  text = 'Loading...',
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin mx-auto mb-2`} />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

export default Loader
