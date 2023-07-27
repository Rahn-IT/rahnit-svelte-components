<script lang="ts">
	import { clamp, debounce, throttle } from 'lodash';
	import { tweened } from 'svelte/motion';
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

	let containerWidth: number | undefined;
	let containerHeight: number | undefined;
	let contentWidth: number | undefined;
	let contentHeight: number | undefined;

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

	let setDirectly = false;

	$: calculateDraw(currentX, currentY, zoomLevel, containerWidth, containerHeight);
	function calculateDraw(
		currentX: number,
		currentY: number,
		zoomLevel: number,
		containerWidth: number | undefined,
		containerHeight: number | undefined
	) {
		if (containerHeight === undefined || containerWidth === undefined) {
			setDirectly = true;
			return;
		}
		const x = currentX * zoomLevel + containerWidth / 2;
		const y = currentY * zoomLevel + containerHeight / 2;

		if (setDirectly) {
			const directly = { duration: 0 };
			drawX.set(x, directly);
			drawY.set(y, directly);
			setDirectly = false;
		} else {
			drawX.set(x);
			drawY.set(y);
		}
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

	let container: HTMLDivElement | undefined;
	let content: HTMLDivElement | undefined;

	export function panTo(element: HTMLElement | SVGElement, instant: boolean = false) {
		//check if element is a child of container
		if (!content.contains(element)) {
			console.error('The element is not part of this container', element);
			return;
		}
		let el: HTMLElement | SVGElement = element;
		let relativeX = 0;
		let relativeY = 0;

		while (el !== content) {
			if (el instanceof HTMLElement) {
				relativeX += el.offsetLeft;
				relativeY += el.offsetTop;
			} else if (el instanceof SVGElement) {
				if (el.attributes.x !== undefined) {
					relativeX += Number(el.attributes.x.value);
				}

				if (el.attributes.y !== undefined) {
					relativeY += Number(el.attributes.y.value);
				}
			} else {
				console.error('Element is not an HTMLElement or SVGElement', el);
				return;
			}
			el = el.parentElement as HTMLElement;
		}

		let targetWidth;
		let targetHeight;
		if (element instanceof HTMLElement) {
			const rect = element.getBoundingClientRect();
			targetWidth = rect.width;
			targetHeight = rect.height;
		} else {
			if (element.attributes.width === undefined || element.attributes.height === undefined) {
				console.error('Element has no width or height', element);
				return;
			}
			targetWidth = Number(element.attributes.width.value);
			targetHeight = Number(element.attributes.height.value);
		}

		const newX = -(relativeX + targetWidth / zoomLevel / 2);
		const newY = -(relativeY + targetHeight / zoomLevel / 2);

		setDirectly = instant;
		currentX = newX;
		currentY = newY;
		posX = newX;
		posY = newY;
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
		class="absolute left-0 top-0 transform"
		class:hidden={containerWidth === undefined || containerHeight === undefined}
		style={contentStyle}
		bind:this={content}
		bind:clientWidth={contentWidth}
		bind:clientHeight={contentHeight}
	>
		<slot />
	</div>
</div>
