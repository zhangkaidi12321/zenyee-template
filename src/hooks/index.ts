import { useLocation } from 'react-router-dom'

export const useRouter = (): string => {
	const { pathname } = useLocation()
	return pathname
}
