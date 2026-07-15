import { computed, ref } from 'vue'
import type { Work } from '../data/projects'

export function useWorkCarousel(items: Work[], initialIndex = 0) {
  const activeIndex = ref(initialIndex)
  const isTransitioning = ref(false)
  const pendingDirection = ref<-1 | 1 | null>(null)
  const activeWork = computed(() => items[activeIndex.value])

  const move = (direction: -1 | 1, onChange: (direction: -1 | 1, commit: () => void) => Promise<void>) => {
    if (isTransitioning.value) {
      pendingDirection.value = direction
      return
    }

    isTransitioning.value = true
    onChange(direction, () => {
      activeIndex.value = (activeIndex.value + direction + items.length) % items.length
    }).finally(() => {
      isTransitioning.value = false
      const pending = pendingDirection.value
      pendingDirection.value = null
      if (pending) move(pending, onChange)
    })
  }

  return { activeIndex, activeWork, isTransitioning, move }
}
