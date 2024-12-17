
<template>
  <div class="container">
   <div></div>
   <div></div>
   <div style="flex-basis: 500rem;">Click me</div>
   <div></div>
   <div style="flex-basis: 30rem;"></div>
   <div></div>
   <div style="flex-basis: 5rem;"></div>
   <div></div>
   <div style="flex-basis: 5rem;"></div>
   <div></div>
   <div style="flex-basis: 2.5em;"></div>
   <div style="flex-basis: 40rem;"></div>
   <div></div>
   <div style="flex-basis: 20rem;"></div>
   <div style="flex-basis: 20rem;"></div>
   <div></div>
   <div></div>
   <div style="flex-basis: 25rem;"></div>
   <div style="flex-basis: 2.5rem;"></div>
   <div style="flex-basis: 25rem;"></div>
   <div></div>
   <div></div>
   <div style="flex-basis: 20rem;"></div>
   <div style="flex-basis: 5rem;"></div>
 </div>
 </template>
 <script setup lang="ts">

 onMounted(() => {
  const container = document.querySelector('.container')
  for (const item of container.children) {
  item.addEventListener('click', () => {
    removeFlexItem(container, item)
  })
}
})
interface FlexItemInfo {
  element: Element

  x: number
  y: number
  width: number
  height: number
}


function removeFlexItem(container: Element, item: Element): void {
  const oldFlexItemsInfo = getFlexItemsInfo(container)
  container.removeChild(item)
  const newFlexItemsInfo = getFlexItemsInfo(container)

  aminateFlexItems(oldFlexItemsInfo, newFlexItemsInfo)
}

function getFlexItemsInfo(container: Element): FlexItemInfo[] {
  return Array.from(container.children).map((item) => {
    const rect = item.getBoundingClientRect()
    return {
      element: item,
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    }
  })
}

function aminateFlexItems(
  oldFlexItemsInfo: FlexItemInfo[],
  newFlexItemsInfo: FlexItemInfo[]
): void {
  for (const newFlexItemInfo of newFlexItemsInfo) {
    const oldFlexItemInfo = oldFlexItemsInfo.find(
      (itemInfo) => itemInfo.element === newFlexItemInfo.element
    )

    const translateX = oldFlexItemInfo.x - newFlexItemInfo.x
    const translateY = oldFlexItemInfo.y - newFlexItemInfo.y
    const scaleX = oldFlexItemInfo.width / newFlexItemInfo.width
    const scaleY = oldFlexItemInfo.height / newFlexItemInfo.height

    newFlexItemInfo.element.animate(
      [
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        },
        { transform: 'none' },
      ],
      {
        duration: 250,
        easing: 'ease-out',
      }
    )
  }
}

</script>


<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.container > * {
  transform-origin: left top;
}

.container > * {
  flex-grow: 1;
  flex-basis: 10rem;
  max-width: 40rem;
  height: 10rem;
  cursor: pointer;
  border: 1px solid #AAA;

  display: flex;
  align-items:center;
 
}
</style>