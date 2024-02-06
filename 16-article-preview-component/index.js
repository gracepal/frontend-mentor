const body = document.querySelector('body')
const popover = document.querySelector('.popover')
const popoverTip = document.querySelector('.popover-tip')
const shareBtn = document.querySelector('button.shareBtn:first-of-type')
const shareBtnMobile = document.querySelector('.shareBtnMobile')
const bottomSectionMobile = document.querySelector('.bottom-hover-mobile')

// Hover Button on Desktop

shareBtn.addEventListener('mouseover', function () {
  if (window.matchMedia('(min-width: 929px)').matches) {
    let svgElem = shareBtn.querySelector('svg path')
    popover.classList.remove('hidden')
    popoverTip.classList.remove('hidden')
    svgElem.setAttribute('fill', 'white')
    shareBtn.setAttribute('style', 'background-color: hsl(214, 17%, 51%);')
  }
})

/**
 * Mouse out close popover if hover target clientX, clientY is outside limits:
 *  (the vertical range between popover top and shareBtn bottom)
 *  (the horizonatal range between popover left and popover right)
 *
 * NOTE: the Right edge mouseout needs follow up.
 */
body.addEventListener('mouseover', (e) => {
  const isDesktopMode = window.matchMedia('(min-width: 929px)').matches
  const isPopoverOpen = !popover.classList.contains('hidden')
  if (isPopoverOpen && isDesktopMode) {
    let btnToUpdate = shareBtn
    const popoverLoc = popover.getBoundingClientRect()
    const shareBtnLoc = btnToUpdate.getBoundingClientRect()
    const isAboveButtonBottom = e.clientY <= shareBtnLoc.bottom
    const isBelowPopoverTop = e.clientY >= popoverLoc.top
    const isRightOfPopoverLeft = e.x >= popoverLoc.left
    const isLeftOfPopoverRight = e.x <= popoverLoc.right
    const withinPopoverArea = isAboveButtonBottom && isBelowPopoverTop && isRightOfPopoverLeft && isLeftOfPopoverRight
    if (!withinPopoverArea) {
      const svgElem = btnToUpdate.querySelector('svg path')
      popover.classList.add('hidden')
      popoverTip.classList.add('hidden')
      svgElem.setAttribute('fill', 'hsl(214, 17%, 51%)')
      btnToUpdate.setAttribute('style', 'background-color: hsl(210, 46%, 95%);')
    }
  }
})

// Click button on mobile - toggles bottom row visibility
document.addEventListener('click', function (e) {
  const isMobileMode = !window.matchMedia('(min-width: 929px)').matches
  const isBottomHidden = bottomSectionMobile.classList.contains('hidden')
  const isClickOverBtn = ['button', 'svg', 'path'].includes(e.target.tagName.toLowerCase())
  // Not mobile, not relevant, return early
  if (!isMobileMode) return
  if (isClickOverBtn) {
    // Is mobile, click is over share button, and target area is not yet visible -> make visible
    if (isBottomHidden) {
      bottomSectionMobile.classList.remove('hidden')
    }
    // Is mobile, click is over share button, and target area is already visible -> make hidden
    else {
      bottomSectionMobile.classList.add('hidden')
    }
  } else {
    const targetAreaLoc = bottomSectionMobile.getBoundingClientRect()
    const isClickAboveAreaTop = e.y < targetAreaLoc.top
    const isClickBelowAreaBottom = e.y > targetAreaLoc.bottom
    const isClickPastAreaLeft = e.x < targetAreaLoc.left
    const isClickPastAreaRight = e.x > targetAreaLoc.right
    const isOutsideArea = isClickAboveAreaTop || isClickBelowAreaBottom || isClickPastAreaLeft || isClickPastAreaRight
    // Is mobile, target area is already visible and click is OUTSIDE target area -> make hidden
    if (!isBottomHidden && isOutsideArea) {
      bottomSectionMobile.classList.add('hidden')
    }
  }
})
