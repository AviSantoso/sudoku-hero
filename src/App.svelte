<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { Board } from "./classes/Board";
  import type { Cell } from "./classes/Cell";
  import { GameController } from "./classes/GameController";
  import SubGrid from "./components/SubGrid.svelte";

  let board = new Board();
  let gc = new GameController(board);
  let selectedCell: Cell | null = null;

  $: subGrids = Array.from(new Array(9)).map((_, i) => board.getSubGrid(i));

  function onClear() {
    gc.clear();
    board = board;
  }

  function onRandom() {
    gc.random(27);
    board = board;
  }

  function handleSelectCell(data) {
    const cell = data.detail.cell;
    selectedCell = cell;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (selectedCell === null) {
      return;
    }

    let val = null;
    if (e.key !== "Backspace" && e.key !== "Delete") {
      let num = parseInt(e.key);
      if (Number.isNaN(num) || num === 0) {
        return;
      }
      val = num;
    }

    board.setCell(selectedCell.row, selectedCell.col, val);
    board = board;
    selectedCell = null;
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });
</script>

<main>
  <h1>Sudoku Hero</h1>

  <div class="board" role="group" aria-label="board">
    {#each subGrids as subGrid}
      <SubGrid {subGrid} {selectedCell} on:select-cell={handleSelectCell} />
    {/each}
  </div>

  <div class="buttons">
    <button on:click={onClear}>Clear</button>
    <button on:click={onRandom}>Random</button>
    <button>Save</button>
    <button class="solve">Solve</button>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .board {
    margin: 2em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 4px;
  }

  button {
    background: white;
  }

  button:hover {
    background: #eee;
  }

  .solve {
    color: white;
    background: #ff6633;
    grid-column: 1 / 4;
  }

  .solve:hover {
    background: #ff571f;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    width: 50%;
    padding: 2px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
