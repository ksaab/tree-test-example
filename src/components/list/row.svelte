<style>
    .main-wrapper {width: 100%;}

    .node-data-wrapper {padding: 5px; cursor: pointer;}
    .node-data-wrapper:hover {background-color: #ccc;}
    .title {float: right}

    .children-wrapper {padding-left: 2rem; border-left: 3px dotted #ccc}
    .node-child {margin-top: 0.1rem;}
    .empty-child {float: right; padding-right: 5px;}

    .depth-1 {background-color: #F5B7B1}
    .depth-2 {background-color: #D2B4DE}
    .depth-3 {background-color: #D1F2EB}
    .depth-4 {background-color: #F7DC6F}
    .depth-5 {background-color: #EDBB99}

    .border-depth-1 {border-left: 2px dotted #F5B7B1}
    .border-depth-2 {border-left: 2px dotted #D2B4DE}
    .border-depth-3 {border-left: 2px dotted #D1F2EB}
    .border-depth-4 {border-left: 2px dotted #F7DC6F}
    .border-depth-5 {border-left: 2px dotted #EDBB99}
</style>

<script>
    import { slide } from 'svelte/transition';

    export let node = {};
    export let depth = 0;
    export let expandGrandchildren = true;

    let showChildren = expandGrandchildren && depth < 3 && node.children.length != 0;

    function Expand() {
        expandGrandchildren = false;
        showChildren = !showChildren;
    }
</script>

<div class="main-wrapper">
    <div class="node-data-wrapper depth-{5 - depth % 5}">
        <div on:click={Expand}>
            <div class="title">{node.title || '<no title>'} (srt {node.srt || 0})</div>
            <div class="clear"></div>
        </div>
    </div>
    {#if showChildren}
        <div class="expand-data-wrapper" transition:slide|local>
            <div class="children-wrapper border-depth-{5 - depth % 5}">
                {#each node.children as child}
                    <div class="node-child">
                        <svelte:self node={child} depth={depth + 1} {expandGrandchildren}/>
                    </div>
                {:else}
                    <div class="empty-child"><i>nothing found</i></div>
                {/each}
            </div>
            <div class="clear"></div>
        </div>
    {/if}
</div>
