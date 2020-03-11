<script>
  import { muted } from "./store";
</script>

<style>
  .toggle {
    position: fixed;
    top: 2vw;
    right: 2vw;
    z-index: 1;
  }
  .tgl {
    display: none;
  }
  .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tgl + .tgl-btn:after,
  .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }
  .tgl + .tgl-btn:after {
    left: 0;
  }
  .tgl + .tgl-btn:before {
    display: none;
  }
  .tgl:checked + .tgl-btn:after {
    left: 50%;
  }
  .tgl-flip + .tgl-btn {
    padding: 2px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    font-family: sans-serif;
    -webkit-perspective: 100px;
    perspective: 100px;
  }
  .tgl-flip + .tgl-btn:after,
  .tgl-flip + .tgl-btn:before {
    display: inline-block;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    width: 100%;
    text-align: center;
    position: absolute;
    line-height: 2em;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 4px;
  }
  .tgl-flip + .tgl-btn:after {
    content: attr(data-tg-on);
    background: #359f35;
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
  .tgl-flip + .tgl-btn:before {
    background: #ff0000;
    content: attr(data-tg-off);
  }
  .tgl-flip + .tgl-btn:active:before {
    -webkit-transform: rotateY(-20deg);
    transform: rotateY(-20deg);
  }
  .tgl-flip:checked + .tgl-btn:before {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  .tgl-flip:checked + .tgl-btn:after {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    left: 0;
    background: #359f35;
  }
  .tgl-flip:checked + .tgl-btn:active:after {
    -webkit-transform: rotateY(20deg);
    transform: rotateY(20deg);
  }
</style>

<div class="toggle">
  <input
    class="tgl tgl-flip"
    id="cb5"
    type="checkbox"
    checked={$muted}
    on:click={() => ($muted = !$muted)} />
  <label class="tgl-btn" data-tg-off="警报" data-tg-on="静音" for="cb5" />
</div>
