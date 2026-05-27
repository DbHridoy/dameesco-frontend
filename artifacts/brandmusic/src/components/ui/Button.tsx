import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-electric-blue/50'
  
  const variants = {
    primary: 'bg-electric-blue text-white hover:bg-electric-cyan shadow-md hover:shadow-glow-sm',
    secondary: 'bg-surface-elevated text-white hover:bg-surface-hover border border-white/10',
    outline: 'border-2 border-white/20 text-white hover:border-electric-blue hover:text-electric-blue hover:bg-electric-blue/5',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base',
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
