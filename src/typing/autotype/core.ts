import { warn } from '~/typing/util'

function coreMixin (Typing:any) {
  Typing.prototype.run = function () {
    this.$actions.forEach((action:any) => {
      this.matchType(action)
    })

    this.runQueue()
  }

  Typing.prototype.runQueue = function () {
    const queue = this.$queue
    const step = (index:any) => {
      if (index >= queue.length) {
        this.$options.end && this.$options.end()
        return
      }
      const fn = queue[index]
      if (fn) {
        fn(() => { step(index + 1) })
      } else {
        step(index + 1)
      }
    }
    step(0)
  }

  Typing.prototype.matchType = function (action:any) {
    if (!action.type) warn('action should has a type')

    switch (action.type) {
      case 'text':
        this.handleText(action)
        break
      case 'wait':
        this.handleWait(action)
        break
      case 'delete':
        this.handleDel(action)
        break
      case 'br':
        this.handleBr(action)
        break
      case 'img':
        this.handleImg(action)
        break
      default:
        warn('Unknown action type')
    }
  }

  Typing.prototype.handleText = function (action:any) {
    if (!action.text) warn('text action should has text property')

    this.$queue.push((next:any) => {
      const wrapper = this.$el
      const textArr = action.text.split('')
      const oldText = wrapper.innerHTML
      let i = 1

      const timer = setInterval(() => {
        wrapper.innerHTML = oldText + textArr.slice(0, i).join('')
        i++
        if (i > textArr.length) {
          clearInterval(timer)
          next()
        }
      }, this.$options.speed)
    })
  }

  Typing.prototype.handleWait = function (action:any) {
    if (!action.time) warn('wait action should has time property')

    this.$queue.push((next:any) => {
      const now = new Date()
      const timer = setInterval(() => {
        const temp = new Date()
        if (temp.getDate() - now.getDate() >= action.time) {
          clearInterval(timer)
          next()
        }
      }, 1000 / 60)
    })
  }

  Typing.prototype.handleDel = function (action:any) {
    if (!action.num) warn('del action should has del num')

    this.$queue.push((next:any) => {
      const wrapper = this.$el
      const oldText = wrapper.innerText
      const textArr = oldText.split('')
      let index = 0

      const timer = setInterval(() => {
        wrapper.innerText = textArr.slice(0, textArr.length - index).join('')
        index++
        if (index > action.num) {
          clearInterval(timer)
          next()
        }
      }, this.$options.speed)
    })
  }

  Typing.prototype.handleBr = function (action:any) {
    this.$queue.push((next:any) => {
      const wrapper = this.$el
      wrapper.appendChild(document.createElement('br'))
      next()
    })
  }

  Typing.prototype.handleImg = function (action:any) {
    if (!action.src) warn('img action should has src property')
    const className = action.class || ''
    const id = action.id || ''

    this.$queue.push((next:any) => {
      const wrapper = this.$el
      const img = document.createElement('img')
      img.src = action.src
      img.className = className
      img.id = id
      wrapper.appendChild(img)
      img.onload = function () {
        next()
      }
    })
  }
}

export default coreMixin
