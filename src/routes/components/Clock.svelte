<script lang="ts">
	let {time}: {time: string} = $props()
</script>

<span>
	<h1>
		{time}
	</h1>
</span>

<style> 
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: fit-content;
		margin: 1em auto 0;
		height: 8em;
		border-radius: 0.5em;
		h1 {
			color: white;
			text-align: center;
			font-size: 4rem;
		}
	}
</style>