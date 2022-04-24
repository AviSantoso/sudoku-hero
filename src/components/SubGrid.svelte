<script lang="ts">
  import type { Cell } from "../classes/Cell";

  import type { Division } from "../classes/Division";

  import Tile from "./Tile.svelte";

  export let subGrid: Division;
  export let selectedCell: Cell | null;

  $: cells = subGrid.cells;
</script>

<div class="subGrid">
  {#each cells as cell}
    <Tile {cell} {selectedCell} on:select-cell />
  {/each}
</div>

<style>
  .subGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    padding: 5px;
    border: 1px solid #eee;
  }
</style>
