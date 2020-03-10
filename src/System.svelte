<script>
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import ST from "./ST.svelte";
  import TS from "./TS.svelte";
  import Analyzer from "./Analyzer.svelte";
  import CV from "./CV.svelte";
  import { maxWidthUnit } from "./store";

  export var analyzers = [];
  export var hasTS;
  export var name;
  var widthUnit = 0;

  onMount(function addConveyors() {
    if (hasTS) {
      var addedConveyors = [
        {
          name: "Collection"
        },
        {
          name: "Feeder"
        },
        {
          name: "TS"
        },
        {
          name: "BufferRight"
        },
        {
          name: "BufferLeft"
        }
      ];
    } else {
      var addedConveyors = [
        {
          name: "Collection"
        },
        {
          name: "Feeder"
        },
        {
          name: "BarcodeTerminal"
        }
      ];
    }

    analyzers = [...addedConveyors, ...analyzers].map(
      function addComponentAndWidth(analyzer) {
        switch (analyzer.name) {
          case "Collection":
          case "Feeder":
          case "BufferRight":
          case "BufferLeft":
            analyzer.component = ST;
            widthUnit += 0.75;
            break;
          case "TS":
            analyzer.component = TS;
            widthUnit += 1.5;
            break;
          case "DI":
            analyzer.component = CV;
            analyzer.name = "CV-50";
            widthUnit += 1;
            break;
          case "SP":
          case "A1c":
            analyzer.component = Analyzer;
            widthUnit += 1.5;
            break;
          default:
            analyzer.component = Analyzer;
            widthUnit += 1;
            break;
        }
        return analyzer;
      }
    );

    if (widthUnit > $maxWidthUnit) {
      maxWidthUnit.set(widthUnit);
    }
  });

  function addSystemName(event) {
    dispatch("serialNOChanged", {
      ...event.detail,
      name,
      hasTS
    });
  }
</script>

<section
  class="system"
  style="--aspect-ratio: {widthUnit/2}; width: {widthUnit / $maxWidthUnit * 100}%;"
>
  {#each analyzers as analyzer, index}
  <svelte:component
    this="{analyzer.component}"
    {analyzer}
    unitNO="{index+1}"
    on:serialNOChanged="{addSystemName}"
  ></svelte:component>
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-bottom: 10vw;
    width: 100%;
  }

  section:last-child {
    margin-bottom: 0;
  }

  [style*="--aspect-ratio"] {
    position: relative;
  }
  [style*="--aspect-ratio"]::before {
    content: "";
    display: block;
    padding-bottom: calc(100% / (var(--aspect-ratio)));
  }
</style>
