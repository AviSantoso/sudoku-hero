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
  $: getSavedUrl();

  function getSavedUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("saved")) {
      const saved = urlParams.get("saved");
      board.load(saved);
      board = board;
    }
  }

  function onClear() {
    gc.clear();
    board = board;
    gc = gc;
  }

  function onRandom() {
    gc.random(21);
    board = board;
    gc = gc;
  }

  function onSolve() {
    gc.solve();
    board = board;
    gc = gc;
  }

  function onSave() {
    const saved = board.save();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set("saved", saved);
    window.location.search = urlParams.toString();
  }

  function handleSelectCell(data) {
    const cell = data.detail.cell;
    selectedCell = cell;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (selectedCell === null) {
      return;
    }

    if (e.key !== "Backspace" && e.key !== "Delete") {
      let num = parseInt(e.key);
      if (Number.isNaN(num) || num === 0) {
        return;
      }
      gc.setCell(selectedCell.row, selectedCell.col, num);
    } else {
      gc.setCell(selectedCell.row, selectedCell.col, null);
    }

    board = board;
    gc = gc;
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

  <div class="counter">
    {gc.numMoves === 0 ? "Waiting..." : gc.numMoves}
  </div>

  <div class="buttons">
    <button on:click={onClear}>Clear</button>
    <button on:click={onRandom}>Random</button>
    <button on:click={onSave}>Save</button>
    <button on:click={onSolve} class="solve">Solve</button>
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
    margin: 1em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 4px;
  }

  .counter {
    margin-bottom: 1em;
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
