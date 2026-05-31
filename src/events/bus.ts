import mitt from 'mitt'

type Events = {
  'save-current-state-event': undefined
}

export const bus = mitt<Events>()
