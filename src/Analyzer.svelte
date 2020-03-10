<script>
  import XN from "./XN.svelte";
  import CV from "./CV.svelte";

  export var analyzer;
  export var unitNO;
  var flexGrow;

  const { name, serialNO } = analyzer;
  var cvName;
  var instrumentContainerWidth;

  if (name == "SP" || name == "A1c") {
    flexGrow = 1.5;
    cvName = "CV-60";
  } else {
    flexGrow = 1;
    cvName = "CV-50";
  }

  $: fontSize =
    name == "SP" || name == "A1c"
      ? instrumentContainerWidth * 0.1313
      : instrumentContainerWidth * 0.202;
</script>

<div class="analyzer" style="--analyzer-flex-grow: {flexGrow};">
  {#if name == "XN"}
  <XN {serialNO} {unitNO} on:serialNOChanged></XN>
  {:else}
  <div
    class="instrument"
    bind:clientWidth="{instrumentContainerWidth}"
    style="font-size: {fontSize}px;"
  >
    {name}
  </div>
  {/if}
  <CV analyzer="{{name: cvName}}" {unitNO}></CV>
</div>

<style>
  .analyzer {
    flex-grow: var(--analyzer-flex-grow);
  }
</style>
