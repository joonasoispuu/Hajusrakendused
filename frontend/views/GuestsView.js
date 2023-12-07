import guestLists from "../components/GuestList.js"
import guestInfoModal from "../components/GuestInfoModal.js"

export default {
    /*html*/
    template: `
    <guest-lists :key="update" @showModal="openModal"></guest-lists>
    <guest-info-modal @guestUpdated="updateView" :guestInModal="guestInModal"></guest-info-modal>
    `,
    components: {
        guestLists,
        guestInfoModal
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