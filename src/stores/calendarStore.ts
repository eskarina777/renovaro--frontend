import { defineStore } from 'pinia'
import type { CalendarDay, TimeSlotType, TimeSlotStatusCodeType } from '@/types/Types'
import { getProviderCalendar } from '@/api/data'
import { usePublishAdStore } from '@/stores/publishAdStore'
export type CurrentStatusType = 'availableCurrentAd' | 'transportCurrentAd'
export type WorkingStatusType = TimeSlotStatusCodeType | CurrentStatusType

export interface WorkingSlot {
  systemTimeSlotId: number
  serviceTimeSlotId: number | null
  startTimeLabel: string
  timeSlotStatusCode: WorkingStatusType
}

export interface WorkingCalendarDay {
  date: string
  timeSlots: WorkingSlot[]
}

export interface CalendarTimeSlotPayload {
  date: string
  systemTimeSlotId: number
  serviceTimeSlotId: number | null
  startTimeLabel: string
  timeSlotStatusCode: 'AVAILABLE' | 'TRANSPORT'
}
const publishAdStore = usePublishAdStore()
function buildSlotKey(date: string, systemTimeSlotId: number): string {
  return `${date}_${systemTimeSlotId}`
}

type UserCalendarState = {
  days: WorkingCalendarDay[]
  changes: Record<string, CalendarTimeSlotPayload>
}

export const useUserCalendarStore = defineStore('userCalendar', {
  state: (): UserCalendarState => ({
    days: [],
    changes: {},
  }),

  getters: {
    isLoaded(state): boolean {
      return state.days.length > 0
    },

    payloadForSubmit(state): CalendarTimeSlotPayload[] {
      return Object.values(state.changes)
    },
  },

  actions: {
    async loadUserCalendar() {
      const data: CalendarDay[] = await getProviderCalendar(
        publishAdStore.adExpirationDate
          ? publishAdStore.adExpirationDate.toISOString().substring(0, 10)
          : null,
      )

      if (!data.length) {
        this.days = []
        return
      }

      this.days = data.map((day) => ({
        date: day.date,
        timeSlots: (day.timeSlots ?? []).map((slot: TimeSlotType) => ({
          systemTimeSlotId: slot.systemTimeSlotId,
          serviceTimeSlotId: (slot.serviceTimeSlotId as number | null) ?? null,
          startTimeLabel: slot.startTimeLabel,
          timeSlotStatusCode: (slot.timeSlotStatusCode as WorkingStatusType) ?? null,
        })),
      }))
    },

    findSlot(date: string, systemTimeSlotId: number): WorkingSlot | undefined {
      const day = this.days.find((d) => d.date === date)
      if (!day) return undefined
      return day.timeSlots.find((s) => s.systemTimeSlotId === systemTimeSlotId)
    },

    toggleSlot(date: string, systemTimeSlotId: number, selection: CurrentStatusType) {
      const slot = this.findSlot(date, systemTimeSlotId)
      console.log('slot =', slot)
      if (!slot) return

      const key = buildSlotKey(date, systemTimeSlotId)

      const isCurrentAdStatus =
        slot.timeSlotStatusCode === 'availableCurrentAd' ||
        slot.timeSlotStatusCode === 'transportCurrentAd'
      if (isCurrentAdStatus) {
        if (slot.serviceTimeSlotId === null) {
          slot.timeSlotStatusCode = null
        } else {
          slot.timeSlotStatusCode = 'AVAILABLE'
        }
        if (this.changes[key]) {
          delete this.changes[key]
        }
        return
      }

      if (slot.timeSlotStatusCode !== null && slot.timeSlotStatusCode !== 'AVAILABLE') {
        return
      }

      slot.timeSlotStatusCode = selection

      const finalStatus: 'AVAILABLE' | 'TRANSPORT' =
        selection === 'availableCurrentAd' ? 'AVAILABLE' : 'TRANSPORT'

      this.changes[key] = {
        date,
        systemTimeSlotId: slot.systemTimeSlotId,
        serviceTimeSlotId: slot.serviceTimeSlotId,
        startTimeLabel: slot.startTimeLabel,
        timeSlotStatusCode: finalStatus,
      }
      console.log('changes map =', this.changes)
    },
  },
})
