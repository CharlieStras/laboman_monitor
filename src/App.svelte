<script>
  const fs = require("fs");
  const low = require("lowdb");
  const FileSync = require("lowdb/adapters/FileSync");
  import { onMount } from "svelte";

  import Toggle from "./Toggle.svelte";
  import System from "./System.svelte";

  const configPath = "./resources/config.json";
  const adapter = new FileSync(configPath);
  const config = low(adapter);

  var windowTitle = "Laboman Monitor";
  var systems = [];

  onMount(function readDB() {
    config.read();
    const title = config.get("title").value();
    if (title) {
      windowTitle = title;
    }

    systems = config
      .get("systems")
      .cloneDeep()
      .value();
  });

  function changeSerialNO(event) {
    const { name, unitNO, serialNO, hasTS } = event.detail;
    config
      .get("systems")
      .find({ name })
      .get(`analyzers[${hasTS ? unitNO - 6 : unitNO - 4}]`)
      .set("serialNO", serialNO)
      .write();
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: 100vh;
    padding: 4.5rem;
    padding-top: 220px;
  }

  header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 10px;
  }

  header h1 {
    text-align: center;
    color: #f2c45a;
    font-size: 4rem;
  }
</style>

<svelte:head>
  <title>{windowTitle}</title>
</svelte:head>

<Toggle />
<main>
  <header>
    <h1>天津医科大学肿瘤医院血球流水线</h1>
  </header>
  {#each systems as system}
    <System
      analyzers={system.analyzers}
      hasTS={system.hasTS}
      name={system.name}
      on:serialNOChanged={changeSerialNO} />
  {/each}
</main>
