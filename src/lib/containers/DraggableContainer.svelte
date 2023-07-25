<script lang="ts">
	import { clamp, max, min } from 'lodash';

	let isDragging = false;
	let posX = 20;
	let posY = 20;
	let offsetX = 0;
	let offsetY = 0;
	let currentX = posX;
	let currentY = posY;
	let drawX = currentX;
	let drawY = currentY;

	let containerWidth: number;
	let containerHeight: number;
	let contentWidth: number;
	let contentHeight: number;

	const defaultZoom = 1;
	export let minZoom = 0.5;
	export let maxZoom = 4;
	export let zoomMultiplier = 1.2;
	let zoomLevel = defaultZoom;

	let hovering = false;

	$: fixPos(minX, maxX, minY, maxY);

	function fixPos(minX: number, maxX: number, mixY: number, maxY: number) {
		posX = clamp(posX, minX, maxX);
		posY = clamp(posY, minY, maxY);
		currentX = posX;
		currentY = posY;
	}

	$: calculateDraw(currentX, currentY, zoomLevel);
	function calculateDraw(currentX: number, currentY: number, zoomLevel: number) {
		const deltaX = (containerWidth - containerWidth * zoomLevel) / 2;
		const deltaY = currentY - containerHeight / 2;
		drawX = currentX * zoomLevel + containerWidth / 2;
		drawY = currentY * zoomLevel + containerHeight / 2;
	}

	$: maxX = (containerWidth / 4) * 3 * 1;
	$: minX = (-contentWidth + containerWidth - maxX) * 1;
	$: maxY = (containerHeight / 4) * 3 * 1;
	$: minY = (-contentHeight + containerHeight - maxY) * 1;

	$: console.log('X', drawX, 'Y', drawY, 'Zoom', zoomLevel);

	$: contentStyle = `transform: matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${drawX}, ${drawY}); ${
		isDragging ? 'user-select: none;' : ''
	} transform-origin: top left`;

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		offsetX = event.pageX;
		offsetY = event.pageY;
	}

	function handleMouseUp(event: MouseEvent) {
		posX = currentX;
		posY = currentY;
		isDragging = false;
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			const deltaX = event.pageX - offsetX;
			const deltaY = event.pageY - offsetY;
			currentX = clamp(posX + deltaX / zoomLevel, minX, maxX);
			currentY = clamp(posY + deltaY / zoomLevel, minY, maxY);
		}
	}

	function handleWheel(event: WheelEvent) {
		const zoomIn: boolean = event.deltaY < 0;
		if (zoomIn) {
			zoomLevel *= zoomMultiplier;
		} else {
			zoomLevel /= zoomMultiplier;
		}
		zoomLevel = clamp(zoomLevel, minZoom, maxZoom);
	}
</script>

<svelte:window on:mouseup|capture={handleMouseUp} on:mousemove={handleMouseMove} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="relative h-full w-full overflow-hidden {isDragging ? 'cursor-grabbing' : 'cursor-move'}"
	on:mousedown={handleMouseDown}
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:wheel|preventDefault={handleWheel}
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
