import { writable } from "svelte/store";

export const instrumentSerialNOs = writable({
  lineOne: {
    unitSerial8: "",
    unitSerial7: "",
    unitSerial6: ""
  },
  lineTwo: {
    unitSerial8: "",
    unitSerial7: "",
    unitSerial6: ""
  }
});

export const muted = writable(true);
