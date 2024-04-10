import styles from './button.module.css'

interface ButtonProps {
  variant?: 'default' | 'menu' | 'icon' | 'ghost' | 'category' | 'dark' | null | undefined
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export function Button ({
  variant,
  children,
  style,
  onClick
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${styles.button}
        ${
          variant === 'menu'
            ? styles.button__menu
            : variant === 'icon'
              ? styles.button__icon
              : variant === 'ghost'
                ? styles.button__ghost
                : variant === 'category'
                  ? styles.button__category
                  : variant === 'dark'
                    ? styles.button__categorydark
                    : styles.button
        }
      `}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
