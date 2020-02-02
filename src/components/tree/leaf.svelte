<style>
    .main-wrapper {float: left; overflow: hidden;}
    .padding-wrapper {padding: 2px;}

    .node-data-wrapper {padding: 5px; cursor: pointer;}
    .node-data-wrapper:hover {background-color: #ccc;}

    .title {text-align: center;}

    .depth-1 {background-color: #F5B7B1}
    .depth-2 {background-color: #D2B4DE}
    .depth-3 {background-color: #D1F2EB}
    .depth-4 {background-color: #F7DC6F}
    .depth-5 {background-color: #EDBB99}
</style>

<script>
    import { fade } from 'svelte/transition';

    export let node = {};
    export let depth = 0;
    export let width = 100;

    let showChildren = depth < 3 && node.children.length != 0;
</script>

<div class="main-wrapper" style="width: {width}%">
    <div class="padding-wrapper">
        <div class="node-data-wrapper depth-{5 - depth % 5}">
            <div on:click={ () => showChildren = !showChildren }>
                <div class="title">{node.id || '<root>'}</div>
            </div>
        </div>
        {#if showChildren}
            <div class="expand-data-wrapper" transition:fade|local>
                <div class="children-wrapper border-depth-{5 - depth % 5}">
                    {#each node.children as child}
                        <svelte:self node={child} depth={depth + 1} width={100 / node.children.length}/>
                    {/each}
                    <div class="clear"></div>
                </div>
            </div>
        {/if}
    </div>
</div>
