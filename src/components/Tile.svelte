<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Cell } from "../classes/Cell";

  const dispatch = createEventDispatcher();

  export let cell: Cell;
  export let selectedCell: Cell | null;

  $: value = cell.value ?? "";

  $: isSelected =
    selectedCell &&
    cell.col === selectedCell.col &&
    cell.row === selectedCell.row;

  $: isValid = cell.colDiv.isValid && cell.rowDiv.isValid && cell.sgDiv.isValid;

  $: cellClass = (() => {
    const classes: string[] = [];

    classes.push("cell");

    if (isSelected) {
      classes.push("selected");
    }

    if (!isValid) {
      classes.push("invalid");
    }

    return classes.join(" ");
  })();

  function selectCell() {
    dispatch("select-cell", {
      cell,
    });
  }
</script>

<div class={cellClass} on:click={selectCell}>
  {value}
</div>

<style>
  .cell {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 0.5px solid #ddd;
  }

  .cell:hover {
    background: #ddd;
    cursor: pointer;
  }

  .selected {
    border: 0.5px solid #aaa;
    background: #eee;
  }

  .invalid {
    background: rgb(255, 200, 200);
  }

  .invalid:hover {
    background: rgb(255, 170, 170);
    cursor: pointer;
  }
</style>
