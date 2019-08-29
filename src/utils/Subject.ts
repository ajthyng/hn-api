interface Handlers {
  [key: string]: ((...args: any[]) => void)[]
}

const _handlers: Handlers = {}

export const Subject = {
  subscribe(event: string, handler: (...args: any[]) => void) {
    if (!_handlers[event]) _handlers[event] = []
    _handlers[event].push(handler)
  },
  unsubscribe(...args: any[]) {
    const [event, handler] = args

    if (!_handlers[event]) return
    _handlers[event] = _handlers[event].filter(func => func !== handler)
  },
  next(...args: any[]) {
    const [event, value] = args

    if (!_handlers[event]) return
    _handlers[event].forEach(handler => {
      if (typeof handler === 'function') {
        handler(value)
      }
    })
  }
}

Object.freeze(Subject)

