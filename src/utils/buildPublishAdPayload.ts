import { usePublishAdStore } from '@/stores/publishAdStore'
import { useFreelanceStore } from '@/stores/freelanceStore'
import { useLocalFlexStore } from '@/stores/localFlexStore'
import type { FreelancePackage } from '@/stores/freelanceStore'
import { useUserCalendarStore } from '@/stores/calendarStore'
export function buildPublishAdPayload() {
  const adGeneral = usePublishAdStore()
  const adFreelancePackage = useFreelanceStore()
  const adLocalService = useLocalFlexStore()
  const userCalendar = useUserCalendarStore()

  const ad = {
    cityId: adLocalService.city?.cityId ?? null,
    adPricingPlanId: adGeneral.adPricingPlan?.adPricingPlanId,
    serviceTypeCode: adGeneral.serviceTypeCode,
    pricingUnitId: adGeneral.pricingUnit?.pricingUnitId,
    subcategoryId: adGeneral.subcategory?.subcategoryId,
    title: adGeneral.adTitle,
    description: adGeneral.adDescription ?? null,
    importantInfo: adGeneral.adInfo ?? null,
  }
  const images = adGeneral.images.map((img, index) => ({
    isPrimary: index === 0,
    file: img.file,
  }))

  function createFreelancePackage(pkg: FreelancePackage) {
    if (!pkg.isEnabled) {
      return null
    }

    return {
      packageTitle: pkg.packageTitle,
      packageDescription: pkg.packageDescription,
      packageInfo: pkg.packageInfo,

      packagePrice: pkg.packagePrice,
      deliveryDays: pkg.deliveryDays,
      revisionCount: pkg.revisionCount,
      renderCount: pkg.renderCount,
      detailDrawingCount: pkg.detailDrawingCount,
      has3DModel: pkg.has3DModel,
      has2DDrawings: pkg.has2DDrawings,
      hasSourceFile: pkg.hasSourceFile,
    }
  }

  const freelancePackage = {
    basic: createFreelancePackage(adFreelancePackage.basic),
    standard: createFreelancePackage(adFreelancePackage.standard),
    premium: createFreelancePackage(adFreelancePackage.premium),
  }

  const localService = {
    servicePriceMin: adLocalService.servicePriceMin,
    servicePriceMax: adLocalService.servicePriceMax,
    providerQuestion: adLocalService.providerQuestion,
    importantInfo: adLocalService.localServiceInfo,
  }

  const consultation =
    adGeneral.hasCalendar === true
      ? {
          consultationPriceMin: adLocalService.consultationPriceMin,
          consultationPriceMax: adLocalService.consultationPriceMax,
        }
      : null
  const serviceTimeSlots = userCalendar.payloadForSubmit
  return {
    ad: ad,
    images: images,
    freelancePackage: adGeneral.serviceTypeCode === 'FREELANCE' ? freelancePackage : null,
    localService: adGeneral.serviceTypeCode === 'LOCAL_FLEX' ? localService : null,
    consultation: consultation,
    serviceTimeSlots: serviceTimeSlots,
  }
}
