import guestLists from "../components/guests/GuestList.js";
import guestInfoModal from "../components/guests/GuestInfoModal.js";
import newObjectModal from "../components/NewObjectModal.js";
import guestForm from "../components/guests/GuestForm.js";

export default {
    template: `
        <div> <!-- Wrap everything in a single root element -->
            <button class="btn btn-secondary" @click="newGuest">New Guest</button>
            <guest-lists :key="update" @showModal="openModal"></guest-lists>
            <guest-info-modal @guestsUpdated="updateView" :guestInModal="guestInModal"></guest-info-modal>
            <new-object-modal id="newGuestModal" @save="saveNewGuest">
                <guest-form v-model:FirstName="guestInModal.FirstName" v-model:LastName="guestInModal.LastName" v-model:PhoneNumber="guestInModal.PhoneNumber" v-model:EmailAddress="guestInModal.EmailAddress"></guest-form>
                <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
            </new-object-modal>
        </div>
    `,
    components: {
        guestLists,
        guestInfoModal,
        newObjectModal,
        guestForm
    },
    data() {
        return {
            update: 0,
            guestInModal: { id: "", FirstName: "", LastName: "", PhoneNumber: "", EmailAddress: "" },
            newGuestModal: {},
            error: ""
        };
    },
    methods: {
        openModal(guest) {
            this.guestInModal = guest;
            let guestInfoModal = new bootstrap.Modal(document.getElementById("guestInfoModal"));
            guestInfoModal.show();
        },
        newGuest() {
            this.error = "";
            this.guestInModal = {};
            this.newGuestModal = new bootstrap.Modal(document.getElementById("newGuestModal"));
            this.newGuestModal.show();
        },
        updateView(guest) {
            this.update++;
            this.guestInModal = guest;
        },
        async saveNewGuest() {
            console.log("Saving:", this.guestInModal);
            const rawResponse = await fetch(this.API_URL + "/guests/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.guestInModal)
            });
            if (rawResponse.ok) {
                this.newGuestModal.hide();
                this.update++;
            } else {
                const errorResponse = await rawResponse.json();
                this.error = errorResponse.error;
            }
        }
    }
};
