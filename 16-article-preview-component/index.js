const body = document.querySelector('body')
const popover = document.querySelector('.popover')
const popoverTip = document.querySelector('.popover-tip')
const shareBtn = document.querySelector('#shareBtn')

shareBtn.addEventListener('mouseover', function () {
  const svgElem = shareBtn.querySelector('svg path')
  popover.classList.remove('hidden')
  popoverTip.classList.remove('hidden')
  svgElem.setAttribute('fill', 'white')
  shareBtn.setAttribute('style', 'background-color: hsl(214, 17%, 51%);')
})

// shareBtn.addEventListener('mouseout', function () {
//   const svgElem = shareBtn.querySelector('svg path')
//   popover.classList.add('hidden')
//   popoverTip.classList.add('hidden')
//   svgElem.setAttribute('fill', 'hsl(214, 17%, 51%)')
//   shareBtn.setAttribute('style', 'background-color: hsl(210, 46%, 95%);')
// })

/**
 * Mouse out close popover if hover target clientX, clientY is outside limits:
 *  (the vertical range between popover top and shareBtn bottom)
 *  (the horizonatal range between popover left and popover right)
 *
 * NOTE: the Right edge mouseout needs follow up.
 */
document.addEventListener('mouseover', (e) => {
  //   console.log('Hovering', e.clientX, e.clientY)
  const popoverLoc = popover.getBoundingClientRect()
  const shareBtnLoc = shareBtn.getBoundingClientRect()
  const isAboveButtonBottom = e.clientY <= shareBtnLoc.bottom
  const isBelowPopoverTop = e.clientY >= popoverLoc.top
  const isRightOfPopoverLeft = e.x >= popoverLoc.left
  const isLeftOfPopoverRight = e.x <= popoverLoc.right
  const withinPopoverArea = isAboveButtonBottom && isBelowPopoverTop && isRightOfPopoverLeft && isLeftOfPopoverRight
  //   console.log('checking ', isLeftOfPopoverRight, 'hovering x=', e.x, popoverLoc.right)
  if (!withinPopoverArea) {
    const svgElem = shareBtn.querySelector('svg path')
    popover.classList.add('hidden')
    popoverTip.classList.add('hidden')
    svgElem.setAttribute('fill', 'hsl(214, 17%, 51%)')
    shareBtn.setAttribute('style', 'background-color: hsl(210, 46%, 95%);')
  }
})
