<script lang="ts">
	import { clamp, max, min } from 'lodash';
	import { tweened, spring } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let isDragging = false;
	let posX = 0;
	let posY = 0;
	let offsetX = 0;
	let offsetY = 0;
	let currentX = posX;
	let currentY = posY;
	const duration = 500;
	const easing = cubicOut;
	const drawX = tweened(currentX, {
		duration: duration,
		easing: easing
	});
	const drawY = tweened(currentY, {
		duration: duration,
		easing: easing
	});

	let containerWidth: number;
	let containerHeight: number;
	let contentWidth: number;
	let contentHeight: number;

	let initialized = false;

	$: init(containerWidth, containerHeight);
	function init(containerWidth: number, containerHeight: number) {
		if (containerWidth === undefined) return;
		if (containerHeight === undefined) return;
		if (initialized) return;
		posX = -containerWidth / 2 + 30;
		posY = -containerHeight / 2 + 30;
		initialized = true;
	}

	const defaultZoom = 1;
	export let minZoom = 0.5;
	export let maxZoom = 4;
	export let zoomMultiplier = 1.2;
	let zoomLevel = defaultZoom;

	const drawZoom = tweened(zoomLevel, {
		duration: duration,
		easing: easing
	});

	$: drawZoom.set(zoomLevel);

	$: maxX = (containerWidth / 4) * 3 - containerWidth / 2;
	$: minX = -contentWidth + containerWidth - maxX - containerWidth;
	$: maxY = (containerHeight / 4) * 3 - containerHeight / 2;
	$: minY = -contentHeight + containerHeight - maxY - containerHeight;

	let hovering = false;

	$: fixPos(minX, maxX, minY, maxY);

	function fixPos(minX: number, maxX: number, mixY: number, maxY: number) {
		posX = clamp(posX, minX, maxX);
		posY = clamp(posY, minY, maxY);
		currentX = posX;
		currentY = posY;
	}

	$: calculateDraw(currentX, currentY, zoomLevel, containerWidth, containerHeight);
	function calculateDraw(
		currentX: number,
		currentY: number,
		zoomLevel: number,
		containerWidth: number,
		containerHeight: number
	) {
		drawX.set(currentX * zoomLevel + containerWidth / 2);
		drawY.set(currentY * zoomLevel + containerHeight / 2);
	}

	$: contentStyle = `transform: matrix(${$drawZoom}, 0, 0, ${$drawZoom}, ${$drawX}, ${$drawY}); ${
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

	let container: HTMLDivElement;
	export function panTo(element: HTMLElement) {
		//check if element is a child of container
		if (!container.contains(element)) {
			return;
		}
		let el: HTMLElement = element;
		let relativeX = 0;
		let relativeY = 0;
		let level = 0;

		while (el !== container) {
			relativeX += el.offsetLeft;
			relativeY += el.offsetTop;
			el = el.parentElement as HTMLElement;
		}

		const rect = element.getBoundingClientRect();

		const newX = relativeX + rect.width / zoomLevel / 2;
		const newY = relativeY + rect.height / zoomLevel / 2;
		currentX = clamp(-newX, minX, maxX);
		currentY = clamp(-newY, minY, maxY);
		posX = currentX;
		posY = currentX;

		return;
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
	bind:this={container}
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
