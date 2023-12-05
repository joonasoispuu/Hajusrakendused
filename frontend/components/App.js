import GuestsList from "./components//GuestList.js"
import GuestInfoModal from "./components//GuestInfoModal.js"

export default {
    template: `
    <guests-list :key="update" @showModal="openModal"></guests-list>
    <guest-info-modal @guestUpdated="updateView" :guestInModal="guestInModal"></guest-info-modal>
    `,
    components: {
        GuestsList,
        GuestInfoModal
    },
    data() {
        return {
            update: 0,
            guestInModal: { id: "", FirstName: "", LastName: "", PhoneNumber: "", EmailAddress: "" }
        }
    },
    methods: {
        openModal(guest) {
            this.guestInModal = guest
            let guestInfoModal = new bootstrap.Modal(document.getElementById("guestInfoModal"))
            guestInfoModal.show()
        },
        updateView(guest) {
            this.update++
            this.guestInModal = guest
        }
    }
}