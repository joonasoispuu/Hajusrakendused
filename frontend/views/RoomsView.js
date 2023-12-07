import roomsList from "../components/RoomList.js"
import roomInfoModal from "../components/RoomInfoModal.js"

export default {
    /*html*/
    template: `
    <rooms-list :key="update" @showModal="openModal"></rooms-list>
    <room-info-modal @roomUpdated="updateView" :roomInModal="roomInModal"></room-info-modal>
    `,
    components: {
        roomsList,
        roomInfoModal
    },
    data() {
        return {
            update: 0,
            roomInModal: { RoomNumber: "", DailyCost: 0, Status: "" }
        }
    },
    methods: {
        openModal(room) {
            this.roomInModal = room
            let roomInfoModal = new bootstrap.Modal(document.getElementById("roomInfoModal"))
            roomInfoModal.show()
        },
        updateView(room) {
            this.update++
            this.roomInModal = room
        }
    }
}