import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const MD = 768
const LG = 1024

export function useBreakpoint() {
  const width = ref<number>(typeof window === 'undefined' ? LG : window.innerWidth)

  const onResize = () => (width.value = window.innerWidth)

  onMounted(() => {
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })

  const isMobile = computed(() => width.value < MD)
  const isTablet = computed(() => width.value >= MD && width.value < LG)
  const isDesktop = computed(() => width.value >= LG)

  return { width, isMobile, isTablet, isDesktop }
}
