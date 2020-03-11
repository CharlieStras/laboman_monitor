<script>
  export var analyzer;
  export var unitNO;
  var containerWidth;

  var { name } = analyzer;
  var fontSize;

  $: if (name == "CV-50") {
    fontSize = containerWidth * 0.1399;
  } else {
    fontSize = containerWidth * 0.0909;
  }
</script>

<style>
  .conveyor {
    flex-grow: 1;
    align-self: flex-end;
  }
</style>

<div class="conveyor cv" style="--aspect-ratio: 1;">
  <div class="mark-container" bind:clientWidth={containerWidth}>
    <img src="../assets/img/CV.svg" alt={name} />
    <div class="unit-number" style="font-size: {fontSize}px;">{unitNO}</div>
  </div>
</div>
