<script>
  const { remote } = require("electron");
  import { onMount } from "svelte";

  import { muted } from "./store";
  const conn = remote.require("./main.js").conn;

  export var serialNumber;
  export var unitNO;
  export var writeSerialNO;
  var countIntervalID;
  var errorIntervalID;
  var sampleCount = 0;
  var isDanger = false;
  var alarm = new Audio("../assets/audio/alarm.mp3");
  alarm.loop = true;

  $: alarm.muted = $muted;

  if (process.env.NODE_ENV != "development") {
    onMount(function startSearch() {
      setTimeout(setSearch, 1000);
      return clearSearch;
    });
  }

  function setSearch() {
    if (serialNumber) {
      countIntervalID = setInterval(searchSampleCount, 5000, serialNumber);
      errorIntervalID = setInterval(searchErrorReport, 5000, serialNumber);
    }
  }

  function clearSearch() {
    clearInterval(countIntervalID);
    clearInterval(errorIntervalID);
  }

  function searchSampleCount(serialNumber) {
    var sampleDate = new Date().toLocaleDateString("zh-CN");
    conn.exec(
      "SELECT COUNT(*) AS sample_count FROM labmain_log WHERE sampleda = ? AND serialno = ?",
      [sampleDate, serialNumber],
      function handleSearchSampleCount(err, result) {
        if (err) {
          throw err;
        } else {
          sampleCount = result[0].sample_count;
        }
      }
    );
  }

  function searchErrorReport(serialNumber) {
    var dateStart = new Date().toLocaleDateString("zh-CN");
    var dateEnd = `${dateStart} 23:59:59`;
    conn.exec(
      "SELECT COUNT(*) AS error_count FROM lab_error_report WHERE (report_datetime BETWEEN ? AND ?) AND instrument_serial_number = ?",
      [dateStart, dateEnd, serialNumber],
      function handleSearchErrorReport(err, result) {
        if (err) {
          throw err;
        } else {
          var errorCount = result[0].error_count;
          if (errorCount > 0) {
            sendNotification();
            isDanger = true;
          } else {
            clearNotification();
            isDanger = false;
          }
        }
      }
    );
  }

  function sendNotification() {
    alarm.play();
  }

  function clearNotification() {
    alarm.pause();
  }

  function handleInputChange(event) {
    clearSearch();
    setSearch();
    writeSerialNO(unitNO, serialNumber);
  }

  function clearAlarm(event) {
    var dateStart = new Date().toLocaleDateString("zh-CN");
    var dateEnd = `${dateStart} 23:59:59`;
    conn.exec(
      "DELETE FROM lab_error_report WHERE (report_datetime BETWEEN ? AND ?) AND instrument_serial_number = ?",
      [dateStart, dateEnd, serialNumber],
      function handleDeleteErrorReport(err, result) {
        if (err) {
          conn.rollback(function(err) {
            if (err) throw err;
          });
          throw err;
        } else {
          conn.commit(function(err) {
            if (err) throw err;
          });
          clearNotification();
          isDanger = false;
        }
      }
    );
  }
</script>

<div class="instrument" class:danger="{isDanger}">
  <div class="main-part">
    <div class="instrument-name">XN</div>
    <div class="count">{sampleCount}</div>
  </div>
  <div class="second-part">
    <input
      type="text"
      bind:value="{serialNumber}"
      placeholder="机身号"
      on:change="{handleInputChange}"
    />
    {#if isDanger}
    <button on:click="{clearAlarm}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <path
          d="M360.85,269.84c-6.3-11.64-10-21-10-34.16V216.15A101.67,101.67,0,0,0,262.37,115.4v-19a13,13,0,0,0-26,0v19.06a99.91,99.91,0,0,0-33.24,10.38A13,13,0,0,0,215,149a74.07,74.07,0,0,1,33.23-8.31h2.46c40.89.59,74.15,34.44,74.15,75.5v19.53c0,20.65,6.76,34.86,13.09,46.56a13,13,0,0,0,22.9-12.4Z"
        />
        <path
          d="M412.83,394.42,105.58,87.17a13,13,0,0,0-18.41,18.41L156.56,175a100.32,100.32,0,0,0-8.76,41.17v19.53c0,17.35-6.3,28.36-14.27,42.3-7.85,13.74-16.76,29.31-21.26,53.33a39.07,39.07,0,0,0,38.39,46.28h59.88a39.06,39.06,0,0,0,78.12,0h59.63a38.67,38.67,0,0,0,9.68-1.21l36.45,36.45a13,13,0,0,0,18.41-18.41ZM249.6,390.61a13,13,0,0,1-13-13h26A13,13,0,0,1,249.6,390.61Zm-98.94-39.06a13,13,0,0,1-12.79-15.44c3.69-19.71,11.1-32.67,18.27-45.2,8.7-15.23,17.7-31,17.7-55.23V216.15a74.6,74.6,0,0,1,3-20.93L333.14,351.55Z"
        />
      </svg>
    </button>
    {/if}
  </div>
</div>

<style>
  .instrument {
    overflow: hidden;
    background: linear-gradient(145deg, #37a437, #2e8a2e);
    color: #fff;
  }

  .main-part {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    transition: transform 0.2s ease-in-out;
    will-change: transform;
  }

  .second-part {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transform: translateY(100%);
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease-in-out;
    will-change: transform;
  }

  .count {
    margin-top: 0.6vw;
    margin-bottom: 0.5vw;
    border: 1px dashed #ffffff;
    border-radius: 3px;
    padding: 0.1vw 0.7vw;
  }

  input {
    border: 0;
    outline: 0;
    background: transparent;
    color: #fff;
    transition: all 0.2s ease-in-out;
    -webkit-appearance: none;
    box-shadow: inset 0.2vw 0.2vw 0.6vw #277527,
      inset -0.2vw -0.2vw 0.6vw #359f35;
    width: 90%;
    font-size: 1.3vw;
    padding: 0.2vw 0;
    text-align: center;
  }

  input:focus {
    box-shadow: inset 0.1vw 0.1vw 0.3vw #277527,
      inset -0.1vw -0.1vw 0.3vw #359f35;
  }

  input::placeholder {
    color: #eee;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2vw;
    margin-top: 0.2vw;
    cursor: pointer;
    border-radius: 100%;
    border: 0;
    box-shadow: 0.2vw 0.2vw 0.6vw #277527, -0.2vw -0.2vw 0.6vw #359f35;
    background: transparent;
  }

  button:active {
    box-shadow: 0.1vw 0.1vw 0.3vw #277527, -0.1vw -0.1vw 0.3vw #359f35;
  }

  svg {
    width: 2.5vw;
    height: 2.5vw;
    fill: #fff;
  }

  .instrument:hover .main-part {
    transform: translateY(-100%);
  }

  .instrument:hover .second-part {
    transform: none;
  }

  .instrument.danger:hover .second-part {
    background: #f00;
  }

  .instrument.danger input {
    box-shadow: inset 0.2vw 0.2vw 0.6vw #d90000,
      inset -0.2vw -0.2vw 0.6vw #ff0000;
  }

  .instrument.danger input:focus {
    box-shadow: inset 0.1vw 0.1vw 0.3vw #d90000,
      inset -0.1vw -0.1vw 0.3vw #ff0000;
  }

  .instrument.danger button {
    box-shadow: 0.2vw 0.2vw 0.6vw #d90000, -0.2vw -0.2vw 0.6vw #ff0000;
  }

  .instrument.danger button:active {
    box-shadow: 0.1vw 0.1vw 0.3vw #d90000, -0.1vw -0.1vw 0.3vw #ff0000;
  }

  .instrument.danger {
    color: #fff;
    animation: blinkRed 0.5s infinite;
  }

  @keyframes blinkRed {
    from {
      background: #f00;
    }
    50% {
      background: #a00;
    }
    to {
      background: #f00;
    }
  }
</style>
