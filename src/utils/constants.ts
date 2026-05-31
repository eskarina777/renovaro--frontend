export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const TYNI_MCE_KEY = import.meta.env.VITE_TYNI_MCE_KEY

import type {
  RatingOption,
  PublishedByOption,
  BudgetOption,
  SortOption,
  SortReviewOption,
  AdPricingFeatures,
  DeliveryDaysOption,
  RevisionCountOption,
} from '@/types/Types'

export const revisionCountOptions: RevisionCountOption[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: -1, label: 'неограничени' },
]
export const deliveryDaysOptions: DeliveryDaysOption[] = [
  { value: 1, label: '1 ден' },
  { value: 2, label: '2 дни' },
  { value: 3, label: '3 дни' },
  { value: 7, label: '7 дни' },
  { value: 14, label: '14 дни' },
  { value: 30, label: '30 дни' },
  { value: -1, label: 'неизвестно' },
]

export const ratingOptions: RatingOption[] = [
  { value: 5, label: '5 звезди' },
  { value: 4, label: '4 звезди' },
  { value: 3, label: '3 звезди' },
  { value: 2, label: '2 звезди' },
  { value: 1, label: '1 звезда' },
]

export const publishedByOptions: PublishedByOption[] = [
  { value: 'specialist', label: 'Специалист' },
  { value: 'company', label: 'Фирма' },
  { value: null, label: 'Всички' },
]

export const budgetOptions: BudgetOption[] = [
  { label: 'до 25 €', value: { min: null, max: 25 } },
  { label: 'от 25 до 50 €', value: { min: 25, max: 50 } },
  { label: 'от 50 до 100 €', value: { min: 50, max: 100 } },
  { label: 'над 100 €', value: { min: 100, max: null } },
]
export const sortOptions: SortOption[] = [
  { label: 'Най-ниска цена', value: 'price_asc' },
  { label: 'Най-висока цена', value: 'price_desc' },
  { label: 'Най-нови', value: 'date_desc' },
  { label: 'Най-разглеждани', value: 'views_desc' },
  { label: 'По подразбиране', value: null },
]

export const sortReviewOptions: SortReviewOption[] = [
  { label: 'Най-ниски', value: 'rating_asc' },
  { label: 'Най-високи', value: 'rating_desc' },
  { label: 'Най-нови', value: 'date_desc' },
  { label: 'По подразбиране', value: null },
]

export const adPricingFeatures: AdPricingFeatures[] = [
  {
    pricingCode: 'DAYS_14',
    features: [
      'Активност на обявата за 14 дни',
      'Безплатно изтегляне на мобилното приложение',
      'Удължаване на личния календар с 14 дни',
      'Качване на до 4 снимки към обявата',
    ],
  },
  {
    pricingCode: 'MONTH_1',
    features: [
      'Активност на обявата за 1 месец',
      'Безплатно изтегляне на мобилното приложение',
      'Удължаване на личния календар с 1 месец',
      'Качване на до 5 снимки към обявата',
    ],
  },
  {
    pricingCode: 'MONTHS_2',
    features: [
      'Активност на обявата за 2 месеца',
      'Безплатно изтегляне на мобилното приложение',
      'Удължаване на личния календар с 2 месеца',
      'Качване на до 6 снимки към обявата',
      'Активиране на VIP за първия ден от публикуването',
    ],
  },
  {
    pricingCode: 'MONTHS_3',
    features: [
      'Активност на обявата за 3 месеца',
      'Безплатно изтегляне на мобилното приложение',
      'Удължаване на личния календар с 3 месеца',
      'Качване на до 8 снимки към обявата',
      'Активиране на VIP за първите два дни от публикуването',
    ],
  },
]
