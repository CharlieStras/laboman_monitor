<script>
  import XN from "./XN.svelte";
  import { instrumentSerialNOs } from "./store";

  export var writeSerialNO;
</script>

<div class="parent">
  <div class="div1 combination">
    <div class="instrument">CRP</div>
    <div class="track">
      <img src="../assets/img/Left_Arrow.svg" alt="Left arrow" />
      <div class="number">12</div>
    </div>
  </div>
  <div class="div2 combination">
    <div class="instrument">A1c</div>
    <div class="track">
      <img src="../assets/img/Left_Arrow.svg" alt="Left arrow" />
      <div class="number">11</div>
    </div>
  </div>
  <div class="div3 track">
    <img src="../assets/img/Left_Arrow.svg" alt="Left arrow" />
    <div class="number">10</div>
  </div>
  <div class="div4 combination">
    <div class="instrument">SP</div>
    <div class="track">
      <img src="../assets/img/Left_Arrow.svg" alt="Left arrow" />
      <div class="number">9</div>
    </div>
  </div>
  <div class="div5 combination">
    <XN
      serialNumber="{$instrumentSerialNOs.lineOne.unitSerial8}"
      unitNO="1-8"
      {writeSerialNO}
    ></XN>
    <div class="track">
      <img src="../assets/img/Left_Arrow.svg" alt="Left arrow" />
      <div class="number">8</div>
    </div>
  </div>
  <div class="div6 combination">
    <XN
      serialNumber="{$instrumentSerialNOs.lineOne.unitSerial7}"
      unitNO="1-7"
      {writeSerialNO}
    ></XN>
    <div class="track">
      <img src="../assets/img/Left_Arrow.svg" alt="Left arrow" />
      <div class="number">7</div>
    </div>
  </div>
  <div class="div7 combination">
    <XN
      serialNumber="{$instrumentSerialNOs.lineOne.unitSerial6}"
      unitNO="1-6"
      {writeSerialNO}
    ></XN>
    <div class="track">
      <img src="../assets/img/Left_Arrow.svg" alt="Left arrow" />
      <div class="number">6</div>
    </div>
  </div>
  <div class="div8 track">
    <img src="../assets/img/Curved_Left_Arrow.svg" alt="Curved left arrow" />
    <div class="number">5</div>
  </div>
  <div class="div9 track">
    <img src="../assets/img/Curved_Right_Arrow.svg" alt="Curved right arrow" />
    <div class="number">4</div>
  </div>
  <div class="div10 track">
    <img src="../assets/img/TS.svg" alt="TS" />
    <div class="number">3</div>
  </div>
  <div class="div11 track">
    <img src="../assets/img/BT.svg" alt="BT" />
    <div class="number">2</div>
  </div>
  <div class="div12 track">
    <img src="../assets/img/CV.svg" alt="CV" />
    <div class="number">1</div>
  </div>
</div>

<style>
  .parent {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1.5fr repeat(3, 1fr) repeat(2, 0.75fr) 1.5fr repeat(
        2,
        0.75fr
      );
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.15vw;
    grid-row-gap: 0.15vw;
    width: 90vw;
    height: calc(90vw * 2 / 12.5);
  }

  .div1 {
    grid-area: 1 / 1 / 3 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 3 / 3;
  }
  .div3 {
    grid-area: 2 / 3 / 3 / 4;
  }
  .div4 {
    grid-area: 1 / 4 / 3 / 5;
  }
  .div5 {
    grid-area: 1 / 5 / 3 / 6;
  }
  .div6 {
    grid-area: 1 / 6 / 3 / 7;
  }
  .div7 {
    grid-area: 1 / 7 / 3 / 8;
  }
  .div8 {
    grid-area: 1 / 8 / 3 / 9;
  }
  .div9 {
    grid-area: 1 / 9 / 3 / 10;
  }
  .div10 {
    grid-area: 1 / 10 / 3 / 11;
  }
  .div11 {
    grid-area: 1 / 11 / 3 / 12;
  }
  .div12 {
    grid-area: 1 / 12 / 3 / 13;
  }
</style>
