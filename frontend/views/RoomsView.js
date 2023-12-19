import roomsList from "../components/rooms/RoomList.js";
import roomInfoModal from "../components/rooms/RoomInfoModal.js";
import newObjectModal from "../components/NewObjectModal.js";
import roomForm from "../components/rooms/RoomForm.js";

export default {
    template: `
        <div>
            <button class="btn btn-secondary" @click="newRoom">New Room</button>
            <rooms-list :key="update" @showModal="openModal"></rooms-list>
            <room-info-modal @roomsUpdated="updateView" :roomInModal="roomInModal"></room-info-modal>
            <new-object-modal id="newRoomModal" @save="saveNewRoom">
                <room-form v-model:RoomNumber="roomInModal.RoomNumber" v-model:DailyCost="roomInModal.DailyCost" v-model:Status="roomInModal.Status"></room-form>
                <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
            </new-object-modal>
        </div>
    `,
    components: {
        roomsList,
        roomInfoModal,
        newObjectModal,
        roomForm
    },
    data() {
        return {
            update: 0,
            roomInModal: { RoomNumber: "", DailyCost: 0, Status: "" },
            newRoomModal: {},
            error: ""
        };
    },
    methods: {
        openModal(room) {
            this.roomInModal = room;
            let roomInfoModal = new bootstrap.Modal(document.getElementById("roomInfoModal"));
            roomInfoModal.show();
        },
        newRoom() {
            this.error = "";
            this.roomInModal = { RoomNumber: "", DailyCost: 0, Status: "Available" };
            this.newRoomModal = new bootstrap.Modal(document.getElementById("newRoomModal"));
            this.newRoomModal.show();
        },        
        updateView(room) {
            this.update++;
            this.roomInModal = room;
        },
        async saveNewRoom() {
            this.roomInModal.Status = "Available";
        
            console.log("Saving:", this.roomInModal);
            const rawResponse = await fetch(this.API_URL + "/rooms/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.roomInModal)
            });
            if (rawResponse.ok) {
                this.newRoomModal.hide();
                this.update++;
            } else {
                const errorResponse = await rawResponse.json();
                this.error = errorResponse.error;
            }
        }        
    }
};
