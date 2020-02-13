<script>
  const fs = require("fs");
  const low = require("lowdb");
  const FileSync = require("lowdb/adapters/FileSync");
  import { onMount } from "svelte";

  import Toggle from "./Toggle.svelte";
  import LineOne from "./LineOne.svelte";
  import LineTwo from "./LineTwo.svelte";
  import { instrumentSerialNOs } from "./store";

  const configPath = "./resources/config.json";
  const adapter = new FileSync(configPath);
  const config = low(adapter);

  var title = "Laboman Monitor";

  onMount(function readDB() {
    if (fs.existsSync(configPath)) {
      config.read();
      var dbSerialNOs = config.get("instrumentSerialNOs").value();
      if (dbSerialNOs) {
        instrumentSerialNOs.set({ ...$instrumentSerialNOs, ...dbSerialNOs });
      }

      var configTitle = config.get("title").value();
      if (configTitle) {
        title = configTitle;
      }
    }
  });

  function writeSerialNO(unitNO, serialNO) {
    var lineNO = unitNO.slice(0, 1);
    unitNO = unitNO.slice(2);

    var key = `instrumentSerialNOs.line${
      lineNO == 1 ? "One" : "Two"
    }.unitSerial${unitNO}`;
    config.set(key, serialNO).write();
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <Toggle></Toggle>
  <LineOne {writeSerialNO}></LineOne>
  <LineTwo {writeSerialNO}></LineTwo>
</main>

<style>
  main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
    height: 100%;
    padding: 0 5vw;
  }
</style>
