import { defineStore } from 'pinia';

export const useClientStore = defineStore('client', {
    state: () => ({
        selectedClient: null,
    }),
    actions: {
        setClient(client) {
            this.selectedClient = client;
        },
        resetClient() {
            this.selectedClient = null;
        },
    },
});
