<script lang="ts">
	import Timer from './Timer.svelte';
	let {
		now,
		name,
		start,
		end,
		image,
		junior
	}: { now: Date; name: string; start: Date; end: Date; image: string; junior: boolean } = $props();

	let completed: boolean = $state(now.getTime() > end.getTime() ? true : false);
	let active: boolean = $state(now.getTime() > start.getTime() && now.getTime() < end.getTime());

	$effect(() => {
		completed = now.getTime() > end.getTime() ? true : false;
		active = now.getTime() > start.getTime() && now.getTime() < end.getTime();
	});
</script>

<span class:junior={junior && active} class={active ? 'active' : ''}>
	{#if junior}
		{#if active}
			<img src="/images/jr-active-{image}" alt="Activity." />
		{:else}
			<img src="/images/jr-{image}" alt="Activity." />
		{/if}
	{:else}
		{#if active}
			<img src="/images/jr-active-{image}" alt="Activity." />
		{:else}
			<img src="/images/{image}" alt="Activity." />
		{/if}
	{/if}
	<div>
		<h3>{name}</h3>
		<span>
			<p>
				{start
					.toLocaleTimeString('en-US', {
						hour12: true,
						hour: 'numeric',
						minute: '2-digit'
					})
					.split(' ', 1)[0]}
			</p>
			<Timer {junior} {completed} {now} endTime={end} startTime={start} {active}></Timer>
			<p>
				{end.toLocaleTimeString('en-US', {
					hour12: true,
					hour: 'numeric',
					minute: '2-digit'
				})}
			</p>
			{#if completed}
				{#if junior}
					<img src="/svgs/jr-check.svg" alt="JuniorCheckmark." />
				{:else}
					<img src="/svgs/check.svg" alt="Checkmark." />
				{/if}
			{:else if active}
				{#if junior}
					<img src="/svgs/jr-active-badge.svg" alt="JuniorBadge." />
				{:else}
					<img src="/svgs/active-badge.svg" alt="Badge." />
				{/if}
			{:else if junior}
				<img src="/svgs/jr-badge.svg" alt="JuniorBadge." />
			{:else}
				<img src="/svgs/badge.svg" alt="Badge." />
			{/if}
		</span>
	</div>
</span>

<style>
	* {
		color: inherit;
	}
	span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin: 0.25em 1em;
		padding: 0.25em 2em;
		gap: 2em;

		img {
			height: 4em;
			width: fit-content;
		}

		div {
			display: flex;
			flex-direction: column;
			width: 100%;
			min-width: fit-content;
			justify-content: space-between;

			h3 {
				font-family: 'Azo Sans Bold';
			}

			p {
				width: 7em;
			}
			p:last-of-type {
				width: 10em;
				min-width: fit-content;
				text-align: right;
			}
			span {
				margin: 0;
				padding: 0;
				gap: 0;
				img {
					height: 2em;
					width: fit-content;
					margin-left: 1em;
				}
			}
		}
	}
	.active {
		padding: 1em 2em;
		background-color: #1376bd;
		border-radius: 1em;
		h3,
		p {
			color: #ffffff;
		}
	}
	.junior {
		background-color: #a839b9;
	}
</style>
