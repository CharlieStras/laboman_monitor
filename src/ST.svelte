<script>
  export var analyzer;
  export var unitNO;

  const { name } = analyzer;
  var containerWidth;

  $: fontSize = containerWidth * 0.1731;
</script>

<style>
  .conveyor {
    flex-grow: 0.75;
  }
</style>

<div class="conveyor">
  <div class="mark-container" bind:clientWidth={containerWidth}>
    <img src="../assets/img/{name}.svg" alt={name} />
    <div class="unit-number" style="font-size: {fontSize}px;">{unitNO}</div>
  </div>
</div>
