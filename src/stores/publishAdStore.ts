import { defineStore } from 'pinia'
import type {
  AdPricingPlan,
  Category,
  PricingCodeType,
  ServiceTypeCode,
  Subcategory,
  PricingUnitType,
} from '@/types/Types'
type PublishAdState = {
  adPricingPlan: AdPricingPlan | null
  adExpirationDate: Date | null
  currentStep: number
  isStepSaved: Record<number, boolean>

  adTitle: string | null
  adDescription: string | null
  category: Category | null
  subcategory: Subcategory | null
  serviceTypeCode: ServiceTypeCode | null
  adInfo: string | null

  hasCalendar: boolean | null
  pricingUnit: PricingUnitType | null
  images: AdImageItem[]
  imagesTermsAccepted: boolean
}
export type AdImageItem = {
  file: File
  previewUrl: string
}

export const usePublishAdStore = defineStore('publishAd', {
  state: (): PublishAdState => ({
    images: [],
    imagesTermsAccepted: false,
    adPricingPlan: null,
    adExpirationDate: null,
    serviceTypeCode: null,
    hasCalendar: false,

    category: null,
    subcategory: null,
    adTitle: null,
    adDescription: null,
    pricingUnit: null,
    adInfo: null,
    currentStep: 1,
    isStepSaved: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
  }),

  actions: {
    addImages(files: File[]) {
      for (const file of files) {
        if (this.images.length >= 5) break
        if (!['image/jpeg', 'image/png'].includes(file.type)) continue
        if (file.size > 5 * 1024 * 1024) continue

        const previewUrl = URL.createObjectURL(file)
        this.images.push({ file, previewUrl })
      }
    },
    replaceImage(index: number, file: File) {
      const previewUrl = URL.createObjectURL(file)

      this.images[index] = {
        file,
        previewUrl,
      }
    },

    setImagesTermsAccepted(value: boolean) {
      this.imagesTermsAccepted = value
    },

    setAdInfo(info: string | null) {
      this.adInfo = info
    },
    setPricingUnit(unit: PricingUnitType | null) {
      this.pricingUnit = unit
    },
    setServiceType(categoryId: number) {
      if (categoryId === 6) {
        this.serviceTypeCode = 'FREELANCE'
      } else {
        this.serviceTypeCode = 'LOCAL_FLEX'
      }
    },
    setAdTitle(title: string | null) {
      this.adTitle = title
    },
    setAdDescription(description: string | null) {
      this.adDescription = description
    },
    setCategory(cat: Category | null) {
      this.category = cat
    },
    setSubcategory(sub: Subcategory | null) {
      this.subcategory = sub
    },

    setPricingPlan(plan: AdPricingPlan) {
      this.adPricingPlan = plan
    },

    reset() {
      this.adPricingPlan = null
    },
    goToStep(step: number) {
      this.currentStep = step
    },

    markStepSaved(step: number) {
      this.isStepSaved[step] = true
    },
    setAdExpirationDateFromPricing(code: PricingCodeType) {
      const now = new Date()
      const expiration = new Date(now)

      if (code === 'DAYS_14') {
        expiration.setDate(expiration.getDate() + 14)
      } else if (code === 'MONTH_1') {
        expiration.setMonth(expiration.getMonth() + 1)
      } else if (code === 'MONTHS_2') {
        expiration.setMonth(expiration.getMonth() + 2)
      } else if (code === 'MONTHS_3') {
        expiration.setMonth(expiration.getMonth() + 3)
      }

      this.adExpirationDate = expiration
    },
  },
})
