import { defineStore } from 'pinia'
import type { City, RatingValue, BudgetRange, SortValue, PublishedByValue } from '@/types/Types'

type RegistrationState = {
  selectedCity: City | null
  rating: RatingValue | null
  budget: BudgetRange | null
  publishedBy: PublishedByValue | null
  sortBy: SortValue | null
}
export const useFiltersStore = defineStore('filters', {
  state: (): RegistrationState => ({
    selectedCity: null,
    rating: null,
    budget: null,
    publishedBy: null,
    sortBy: null,
  }),

  actions: {
    setCity(city: City | null) {
      this.selectedCity = city
    },

    clearCity() {
      this.selectedCity = null
    },
    setRating(rating: RatingValue | null) {
      this.rating = rating
    },
    setPublishedBy(value: PublishedByValue | null) {
      this.publishedBy = value
    },
    setBudget(budget: BudgetRange | null) {
      this.budget = budget
    },
    setSort(value: SortValue | null) {
      this.sortBy = value
    },

    clearAllFilters() {
      this.rating = null
      this.budget = null
      this.publishedBy = null
      this.sortBy = null
    },
  },
})
