import { merge } from '~/typing/util'

function initMixin (Typing:any) {
  Typing.prototype._init = function (actions:any, options:any) {
    this.$actions = actions
    this.$options = merge(Typing.defaultOptions, options || {})
    this.$queue = []

    this._initStyle()
  }

  Typing.prototype._initStyle = function () {
    const selector = this.$el.className ? '.' : '#'
    const cssText = `
      @keyframes blink {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    
      ${selector}${this.$el.className || this.$el.id}::after {
        content: '|';
        animation: blink 1000ms infinite;
      }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssText
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}

export default initMixin
