import confirmationModal from "../ConfirmationModal.js";
import roomForm from "./RoomForm.js";
import roomDetails from "./RoomDetails.js";

export default {
    template: `
        <div id="roomInfoModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <room-form v-if="isEditing" v-model:RoomNumber="modifiedRoom.RoomNumber" v-model:DailyCost="modifiedRoom.DailyCost" v-model:Status="modifiedRoom.Status" :is-editing="isEditing"></room-form>
                        <room-details v-else :roomInModal="roomInModal"></room-details>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <template v-if="isEditing">
                                    <div class="col me-auto">
                                        <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-success mx-2" @click="saveModifiedRoom">Save</button>
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
        <confirmation-modal :target="'#roomInfoModal'" @confirmed="deleteRoom"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        roomForm,
        roomDetails
    },
    emits: ["roomsUpdated"],
    props: {
        roomInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedRoom: {}
        };
    },
    methods: {
        startEditing() {
            this.modifiedRoom = { ...this.roomInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedRoom() {
            const response = await fetch("http://localhost:8080/rooms/" + this.modifiedRoom.RoomNumber, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedRoom)
            });
            if (response.ok) {
                this.$emit("roomsUpdated", this.modifiedRoom);
                this.isEditing = false;
            } else {
                console.error("Failed to update room:", response.statusText);
            }
        },
        async deleteRoom() {
            const response = await fetch(`http://localhost:8080/rooms/${this.modifiedRoom.RoomNumber}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.$emit("roomsUpdated");
            } else {
                console.error("Failed to delete room:", response.statusText);
            }
        }
    }
};
