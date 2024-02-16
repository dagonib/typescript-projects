import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAllowed: boolean
  children?: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }: Props) => {
  if (!isAllowed) return <Navigate to='/login' />

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
