import confirmationModal from "../ConfirmationModal.js";
import guestForm from "./GuestForm.js";
import guestDetails from "./GuestDetails.js";

export default {
    template: `
        <div id="guestInfoModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <guest-form v-if="isEditing" v-model:id="modifiedGuest.id" v-model:FirstName="modifiedGuest.FirstName" v-model:LastName="modifiedGuest.LastName" v-model:PhoneNumber="modifiedGuest.PhoneNumber" v-model:EmailAddress="modifiedGuest.EmailAddress"></guest-form>
                        <guest-details v-else :guestInModal="guestInModal"></guest-details>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <template v-if="isEditing">
                                    <div class="col me-auto">
                                        <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-success mx-2" @click="saveModifiedGuest">Save</button>
                                        <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="col me-auto"></div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <confirmation-modal :target="'#guestInfoModal'" @confirmed="deleteGuest"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        guestForm,
        guestDetails
    },
    emits: ["guestsUpdated"],
    props: {
        guestInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedGuest: {}
        };
    },
    methods: {
        startEditing() {
            this.modifiedGuest = { ...this.guestInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedGuest() {
            const rawResponse = await fetch("http://localhost:8080/guests/" + this.modifiedGuest.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedGuest)
            });
            this.$emit("guestsUpdated", this.modifiedGuest);
            this.isEditing = false;
        },
        async deleteGuest() {
            const response = await fetch(`http://localhost:8080/guests/${this.modifiedGuest.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.$emit("guestsUpdated");
            }
        }
    }
};
