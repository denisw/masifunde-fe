import { useRouter } from 'next/router'

export default function useLocale() {
  const router = useRouter()
  let { locale } = router.query

  if (!locale && isEnglishPath(router.asPath)) {
    return 'en'
  }
  return locale || 'de'
}

function isEnglishPath(path) {
  return path === '/en' || path.startsWith('/en/')
}
