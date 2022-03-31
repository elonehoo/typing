export const $ = (el:any) => {
  return el && document.querySelector(el)
}

export const addEvent = (el:any, type:any, handler:any) => {
  el.addEventListener(type, handler, false)
}

export const warn = (msg:any) => {
  throw new Error(msg)
}

export const addClass = (el:any, newClass:any) => {
	let oldClass = el.className
	el.className = oldClass ? `${oldClass} ${newClass}` : newClass
}

// obj1为默认配置，obj2为自定义配置
export const merge = (obj1:any, obj2:any) => {
	const obj = Object.assign({}, obj1)
	Object.keys(obj2).forEach(key => {
		obj[key] = obj2[key]
	})
	return obj
}

export const removeClass = (obj:any, cls:any) => {
  // 获取 class 内容, 并在首尾各加一个空格.  'abc    bcd' -> ' abc    bcd '
	let objClass = ' ' + obj.className + ' '
	// 将多余的空字符替换成一个空格.  ' abc    bcd ' -> ' abc bcd '
	objClass = objClass.replace(/(\s+)/gi, ' ')
		// 在原来的 class 替换掉首尾加了空格的 class.  ' abc bcd ' -> 'bcd '
	let removed = objClass.replace(' ' + cls + ' ', ' ')
		// 去掉首尾空格.  'bcd ' -> 'bcd'
	removed = removed.replace(/(^\s+)|(\s+$)/g, '')
		// 替换原来的 class
	obj.className = removed
}
