import { createApp } from 'vue';
import GuestsList from "./components/GuestList.js";
import GuestInfoModal from "./components/GuestInfoModal.js";

const AppComponent = {
    template: `
        <guests-list @showModal="openModal"></guests-list>
        <guest-info-modal :guestInModal="guestInModal"></guest-info-modal>
    `,
    components: {
        GuestsList,
        GuestInfoModal
    },
    data() {
        return {
            msg: 'Hello world!',
            guestInModal: { id: "", FirstName: "", LastName: "", PhoneNumber: "", EmailAddress: "" }
        }
    },
    methods: {
        openModal(guest) {
            this.guestInModal = guest;
            let guestInfoModal = new bootstrap.Modal(document.getElementById("guestInfoModal"));
            guestInfoModal.show();
        }
    }
};

createApp(AppComponent).mount('#app');
