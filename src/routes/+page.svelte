<script lang="ts">
	import Activity from './components/Activity.svelte';
	import Clock from './components/Clock.svelte';
	import {
		activities,
		seniorActivities,
		getSeniorTimeBlocks,
		getTimeBlocks
	} from './components/data';

	let now: Date = $state(new Date());
	let firstHourTimeBlocks: Date[];
	let lastHourTimeBlocks: Date[];
	let secondHourTimeBlocks: Date[];
	let seniorFirstHourTimeBlocks: Date[];
	let seniorLastHourTimeBlocks: Date[];
	let seniorSecondHourTimeBlocks: Date[];
	let seniorThirdHourTimeBlocks: Date[];
	let thirdHourTimeBlocks: Date[];
	let startTime: Date;
	let endTime: Date;
	let seniorEndTime: Date;
	let timeBlocks: Date[] | undefined = $state();
	let seniorTimeblocks: Date[] | undefined = $state();

	function setTimeBlocks() {
		seniorFirstHourTimeBlocks =
			now.getDay() == 6
				? getSeniorTimeBlocks(false, 10, seniorActivities.length)
				: getSeniorTimeBlocks(true, 15, seniorActivities.length);
		seniorSecondHourTimeBlocks =
			now.getDay() == 6
				? getSeniorTimeBlocks(false, 11, seniorActivities.length)
				: getSeniorTimeBlocks(true, 16, seniorActivities.length);
		seniorThirdHourTimeBlocks =
			now.getDay() == 6
				? getSeniorTimeBlocks(false, 12, seniorActivities.length)
				: getSeniorTimeBlocks(true, 17, seniorActivities.length);
		seniorLastHourTimeBlocks =
			now.getDay() == 6
				? getSeniorTimeBlocks(false, 13, seniorActivities.length)
				: getSeniorTimeBlocks(true, 18, seniorActivities.length);

		firstHourTimeBlocks = now.getDay() == 6 ? getTimeBlocks(false, 10) : getTimeBlocks(true, 15);
		secondHourTimeBlocks = now.getDay() == 6 ? getTimeBlocks(false, 11) : getTimeBlocks(true, 16);
		thirdHourTimeBlocks = now.getDay() == 6 ? getTimeBlocks(false, 12) : getTimeBlocks(true, 17);
		lastHourTimeBlocks = now.getDay() == 6 ? getTimeBlocks(false, 13) : getTimeBlocks(true, 18);
		startTime = firstHourTimeBlocks[0];
		endTime = lastHourTimeBlocks[lastHourTimeBlocks.length - 1];
		endTime.setHours(
			lastHourTimeBlocks[0].getHours() + 1,
			lastHourTimeBlocks[0].getMinutes(),
			0,
			0
		);
		seniorEndTime = seniorLastHourTimeBlocks[seniorLastHourTimeBlocks.length - 1];
		seniorEndTime.setHours(
			seniorLastHourTimeBlocks[0].getHours() + 1,
			seniorLastHourTimeBlocks[0].getMinutes(),
			0,
			0
		);
		timeBlocks = lastHourTimeBlocks;
		seniorTimeblocks = seniorLastHourTimeBlocks;
	}

	function setHour(): Date[] {
		let timeblocks: Date[];

		if (now.getTime() < secondHourTimeBlocks[0].getTime()) {
			timeblocks = firstHourTimeBlocks;
		} else if (now.getTime() < thirdHourTimeBlocks[0].getTime()) {
			timeblocks = secondHourTimeBlocks;
		} else if (now.getTime() < lastHourTimeBlocks[0].getTime()) {
			timeblocks = thirdHourTimeBlocks;
		} else if (now.getTime() < endTime.getTime()) {
			timeblocks = lastHourTimeBlocks;
		} else {
			timeblocks = firstHourTimeBlocks;
		}
		return timeblocks;
	}

	function setSeniorHour(): Date[] {
		let seniorTimeblocks: Date[];

		if (now.getTime() < seniorSecondHourTimeBlocks[0].getTime()) {
			seniorTimeblocks = seniorFirstHourTimeBlocks;
		} else if (now.getTime() < seniorThirdHourTimeBlocks[0].getTime()) {
			seniorTimeblocks = seniorSecondHourTimeBlocks;
		} else if (now.getTime() < seniorLastHourTimeBlocks[0].getTime()) {
			seniorTimeblocks = seniorThirdHourTimeBlocks;
		} else if (now.getTime() < seniorEndTime.getTime()) {
			seniorTimeblocks = seniorLastHourTimeBlocks;
		} else {
			seniorTimeblocks = seniorFirstHourTimeBlocks;
		}
		return seniorTimeblocks;
	}

	function hourStart(now: Date, startTime: Date, endTime: Date): boolean {
		if (now > startTime && now < endTime) {
			return true;
		} else {
			return false;
		}
	}

	function updateTime(): void {
		now = new Date();
		if(now.getMinutes() == 0) {
			setTimeBlocks()
		}
		timeBlocks = setHour();
		seniorTimeblocks = setSeniorHour();
		setTimeout(updateTime, 1);
	}
	setTimeBlocks()
	updateTime();
</script>

<Clock
	time={now.toLocaleTimeString('en-US', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
	})}
></Clock>
<section>
	<div>
		<h1>Junior Activites</h1>
		<br />
		<span class="jr-divider"></span>
		{#each activities as activity, i}
			{#if timeBlocks}
				<Activity
					{now}
					name={activity.name}
					start={timeBlocks[i]}
					end={timeBlocks[i + 1]}
					image={activity.image}
					junior={true}
				></Activity>
			{/if}
			<span class="jr-divider"></span>
		{/each}
		<br />
	</div>
	<div>
		<h1>Create Activites</h1>
		<br />
		<span></span>
		{#each seniorActivities as activity, i}
			{#if seniorTimeblocks}
				<Activity
					{now}
					name={activity.name}
					start={seniorTimeblocks[i]}
					end={seniorTimeblocks[i + 1]}
					image={activity.image}
					junior={false}
				></Activity>
			{/if}
			<span></span>
		{/each}
		<br />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: stretch;
		padding: 0;
		width: 100svw;
		gap: 4em;
		min-height: calc(100svh - 12em);
		position: relative;
	}

	div {
		width: fit-content;
		background-color: #fff4ff;
		border-radius: 0.75em;
		color: #a839b9;
		border: solid 0.3em #a839b9;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2em;
		flex-direction: column;
	}
	div:last-of-type {
		background-color: #f4f7ff;
		border: solid 0.3em #1376bd;
		color: #1376bd;
	}

	span {
		width: 95%;
		height: 0.2em;
		background-color: #1376bd20;
		border-radius: 1em;
	}

	.jr-divider {
		width: 95%;
		height: 0.2em;
		background-color: #a839b920;
		border-radius: 1em;
	}
</style>
