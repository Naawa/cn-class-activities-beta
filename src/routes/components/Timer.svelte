<script lang="ts">
	let {
		now,
		endTime,
		startTime,
		active,
		completed,
		junior
	}: { now: Date; endTime: Date; active: boolean; startTime: Date; completed: Boolean, junior: boolean } = $props();
	let width: number = $state(0);
	let status: string = $state('inactive');

	$effect(() => {
		if (active) {
			width =
				((now.getTime() - startTime.getTime()) / (endTime.getTime() - startTime.getTime())) * 100;
		} else if (completed) {
			width = 100;
		} else {
			width = 0;
		}
	});
</script>

<span class:jr-span={junior}>
	{#if completed && !junior}
		<div class="completed"></div>
	{:else if active && !junior}
		<div class="active"  style="width: {width}%;"></div>
	{:else}
		<div class="inactive"></div>
	{/if}
	{#if completed && junior}
		<div class="jr-completed"></div>
	{:else if active && junior}
		<div class="jr-active"  style="width: {width}%;"></div>
	{:else}
		<div class="jr-inactive"></div>
	{/if}
</span>

<style>
	span {
		width: 100%;
		background-color: rgb(175, 215, 255);
		height: 0.3em;
		border-radius: 1em;
		display: flex;
		align-items: center;

		div {
			height: 0.3em;
			border-radius: 1em;
			width: 100%;
		}
		.inactive {
			width: 0%;
			background-color: #ffffff;
			outline: none;
		}
		.active {
			background-color: #ffffff;
			outline: solid 0.2em #1376bd;
		}
		.completed {
			background-color: #1376bd;
			outline: none;
		}

		.jr-inactive {
			width: 0%;
			background-color: #ffffff;
			outline: none;
		}
		.jr-active {
			background-color: #ffffff;
			outline: solid 0.2em #a839b9;
		}
		.jr-completed {
			background-color: #a839b9;
			outline: none;
		}
	}

	.jr-span {
		background-color: #f8ccfe;
	}
</style>
