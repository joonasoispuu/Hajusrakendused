document.addEventListener('DOMContentLoaded', () => {
    const app = Vue.createApp({
        data() {
            return {
                guestInModal: {},
                guests: []
            };
        },
        async created() {
            this.guests = await (await fetch("http://localhost:8080/guests")).json();
        },
        methods: {
            async getGuest(id) {
                try {
                    const response = await fetch(`http://localhost:8080/guests/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    this.guestInModal = await response.json();
                    this.$nextTick(() => {
                        const guestInfoModal = new bootstrap.Modal(document.getElementById('guestInfoModal'));
                        guestInfoModal.show();
                    });
                } catch (e) {
                    console.error('Error fetching guest details:', e);
                }
            }        
        }
    });

    app.mount('#app');
});
