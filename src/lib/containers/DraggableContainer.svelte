<script lang="ts">
  import { clamp, max, min } from "lodash";

  let isDragging = false;
  let posX = 20;
  let posY = 20;
  let offsetX = 0;
  let offsetY = 0;
  let drawX = posX;
  let drawY = posY;

  let containerWidth: number;
  let containerHeight: number;
  let contentWidth: number;
  let contentHeight: number;

  $: fixPos(minX, maxX, minY, maxY);

  function fixPos(minX: number, maxX: number, mixY: number, maxY: number) {
    posX = clamp(posX, minX, maxX);
    posY = clamp(posY, minY, maxY);
    drawX = posX;
    drawY = posY;
  }

  $: maxX = (containerWidth / 4) * 3;
  $: minX = -contentWidth + containerWidth - maxX;
  $: maxY = (containerHeight / 4) * 3;
  $: minY = -contentHeight + containerHeight - maxY;

  $: contentStyle = `transform: translate(${drawX}px, ${drawY}px);`;
  $: containerStyle = `cursor: ${isDragging ? "grabbing" : "move"};`;

  function handleMouseDown(event: MouseEvent) {
    event.stopPropagation();
    isDragging = true;
    offsetX = event.pageX;
    offsetY = event.pageY;
  }

  function handleMouseUp(event: MouseEvent) {
    event.stopPropagation();
    posX = drawX;
    posY = drawY;
    isDragging = false;
  }

  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      drawX = clamp(posX + event.pageX - offsetX, minX, maxX);
      drawY = clamp(posY + event.pageY - offsetY, minY, maxY);
    }
  }
</script>

<div
  class="relative h-full w-full overflow-hidden"
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
  style={containerStyle}
  bind:clientWidth={containerWidth}
  bind:clientHeight={containerHeight}
>
  <div
    class="absolute left-0 top-0"
    style={contentStyle}
    bind:clientWidth={contentWidth}
    bind:clientHeight={contentHeight}
  >
    <slot />
  </div>
</div>
