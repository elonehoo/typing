import coreMixin from '~/typing/autotype/core'
import initMixin from '~/typing/autotype/init'
import { warn, $ } from '~/typing/util'

function Typing (el, actions, options) {
  
  this.$el = typeof el === 'string' ? $(el) : el
  if (!this.$el) {
    warn('can not resolve the content dom')
  }
  if (!Array.isArray(actions)) {
    warn('actions must be an array')
  }

  this._init(actions, options)
}

Typing.defaultOptions = {
  speed: 200,
  end: null
}

initMixin(Typing)
coreMixin(Typing)

export default Typing

