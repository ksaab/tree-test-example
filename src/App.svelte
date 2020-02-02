<style>
	.main-wrapper {min-width: 1200px;}

	.wrapper-content {float: left; width: 50%; min-width: 600px;}
	.content {padding: 0.5rem 1rem 0.5rem 1rem;}

	.wrapper-options {float: right; width: 50%; min-width: 600px;}
	.options {padding: 0.5rem 1rem 0.5rem 1rem;}

	input {width: 100%}
	textarea {width: 100%; height: 250px;}

	.wrapper-button {margin-top: 10px;}

	button {border: none; background-color: salmon; width: 120px; padding: 5px 10px; color: white; cursor: pointer; transition: background-color 0.2s linear}
	button:hover {background-color: sandybrown}
</style>

<script>
	import { GetData, ParseRaw } from './util.js';
	import Row from './components/list/row.svelte';
	import Leaf from './components/tree/leaf.svelte';

	let textarea = 
`[
	{"id":0,"parent_id":null,"title":"0","srt":1}, 
	{"id":1,"parent_id":0,"title":"id 1, child of 0","srt":0},
	{"id":2,"parent_id":0,"title":"id 2, child of 0","srt":0},
	{"id":3,"parent_id":0,"title":"id 3, child of 0","srt":0},
	{"id":4,"parent_id":1,"title":"id 4, child of 1","srt":0},
	{"id":5,"parent_id":1,"title":"id 5, child of 1","srt":0},
	{"id":6,"parent_id":4,"title":"id 6, child of 4","srt":0},
	{"id":7,"parent_id":4,"title":"id 7, child of 4","srt":0},
	{"id":8,"parent_id":7,"title":"id 8, child of 7","srt":0},
	{"id":9,"parent_id":8,"title":"id 9, child of 8","srt":0}
]`;
	let url = 'https://rcslabs.ru/locations2.json';
	let prepared = GetData(url);
	let type = 'list'

	function PrepareFetchedDataFromURL() {
		return async () => { return await GetData(url) };
	}

	function PrepareFetchedDataFromString() {
		return async () => { return ParseRaw(url) };
	}

	function DrawFromURL(draw) {
		type = draw;
		prepared = GetData(url);
	}

	function DrawFromString(draw) {
		type = draw;
		prepared = new Promise((res) => { res(ParseRaw(textarea)) });
	}
</script>

<div class="main-wrapper">
	<div class="wrapper-content">
		<div class="content">
			<h3>Result ({type === 'list' ? 'titles used as element text' : 'ids used as element text'})</h3>
			{#await prepared}
				<div>Loading Data...</div>
			{:then value}
				{#if type === 'list'}
					<Row node={value}/>
				{:else if type === 'tree'}
					<Leaf node={value}/>
				{/if}
			{:catch error}
				<div>Something went wrong :(</div>
				<div>{error}</div>
			{/await}
		</div>
	</div>

	<div class="wrapper-options">
		<div class="options">
			<h3>Options</h3>
			<div>
				<label>
					<span>Source URL</span>
					<br/>
					<input type="text" bind:value={url}>
					<div class="wrapper-button">
						<button on:click|preventDefault={ () => DrawFromURL('list') }>List</button>
						<button on:click|preventDefault={ () => DrawFromURL('tree') }>Tree</button>
					</div>
				</label>
				<hr/>
				<label>
					<span>From text</span>
					<br/>
					<textarea bind:value={textarea}></textarea>
					<div class="wrapper-button">
						<button on:click|preventDefault={ () => DrawFromString('list') }>List</button>
						<button on:click|preventDefault={ () => DrawFromString('tree') }>Tree</button>
					</div>
				</label>
			</div>
		</div>
	</div>

	<div class="clear"></div>
</div>