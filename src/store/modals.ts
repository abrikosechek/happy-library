import { defineStore } from "pinia";

interface Modal {
  name: string
  data?: any
}

export const useModalsStore = defineStore("modals", {
  state: () => ({
    modal: null as null | Modal
  }),
  actions: {
    setModal(state: null | Modal) {
      this.modal = state
    }
  }
})