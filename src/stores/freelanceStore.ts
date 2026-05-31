import { defineStore } from 'pinia'
export type PackageType = 'basic' | 'standard' | 'premium'
export type PackageFieldKey = keyof FreelancePackage
export type FreelancePackage = {
  isEnabled: boolean

  packageTitle: string | null
  packageDescription: string | null

  packagePrice: number | null
  deliveryDays: number | null
  revisionCount: number | null
  renderCount: number | null
  detailDrawingCount: number | null
  has3DModel: boolean | null
  has2DDrawings: boolean | null
  hasSourceFile: boolean | null

  packageInfo: string | null
}

function createEmptyPackage(isEnabled: boolean): FreelancePackage {
  return {
    isEnabled,

    packageTitle: null,
    packageDescription: null,
    packageInfo: null,

    packagePrice: null,
    deliveryDays: null,
    revisionCount: null,
    renderCount: null,
    detailDrawingCount: null,
    has3DModel: null,
    has2DDrawings: null,
    hasSourceFile: null,
  }
}

export const useFreelanceStore = defineStore('scopeFreelance', {
  state: () => ({
    basic: createEmptyPackage(true),
    standard: createEmptyPackage(false),
    premium: createEmptyPackage(false),
  }),

  actions: {
    setField<K extends PackageFieldKey>(type: PackageType, key: K, value: FreelancePackage[K]) {
      ;(this[type] as FreelancePackage)[key] = value
    },
    setPackageTitle(type: PackageType, value: string | null) {
      this[type].packageTitle = value
    },

    setPackageDescription(type: PackageType, value: string | null) {
      this[type].packageDescription = value
    },

    setPackageInfo(type: PackageType, value: string | null) {
      this[type].packageInfo = value
    },

    setEnabled(packageType: PackageType, value: boolean) {
      this[packageType].isEnabled = value
    },

    resetPackage(packageType: PackageType) {
      const isEnabled = this[packageType].isEnabled
      this[packageType] = createEmptyPackage(isEnabled)
    },

    resetAll() {
      this.basic = createEmptyPackage(true)
      this.standard = createEmptyPackage(false)
      this.premium = createEmptyPackage(false)
    },
  },
})
