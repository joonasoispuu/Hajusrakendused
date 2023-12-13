import bookingsList from "../components/bookings/BookingList.js";
import bookingInfoModal from "../components/bookings/BookingInfoModal.js";
import newObjectModal from "../components/NewObjectModal.js";
import bookingForm from "../components/bookings/BookingForm.js";

export default {
    template: `
        <div>
            <button class="btn btn-secondary" @click="newBooking">New Booking</button>
            <bookings-list :key="update" @showModal="openModal"></bookings-list>
            <booking-info-modal @bookingsUpdated="updateView" :bookingInModal="bookingInModal"></booking-info-modal>
            <new-object-modal id="newBookingModal" @save="saveNewBooking">
                <booking-form v-model:GuestId="bookingInModal.GuestId" v-model:RoomNumber="bookingInModal.RoomNumber" v-model:CheckInDate="bookingInModal.CheckInDate" v-model:CheckOutDate="bookingInModal.CheckOutDate" v-model:Status="bookingInModal.Status"></booking-form>
                <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
            </new-object-modal>
        </div>
    `,
    components: {
        bookingsList,
        bookingInfoModal,
        newObjectModal,
        bookingForm
    },
    data() {
        return {
            update: 0,
            bookingInModal: { id: "", GuestId: "", RoomNumber: "", CheckInDate: "", CheckOutDate: "", Status: "" },
            newBookingModal: {},
            error: ""
        };
    },
    methods: {
        openModal(booking) {
            this.bookingInModal = booking;
            let bookingInfoModal = new bootstrap.Modal(document.getElementById("bookingInfoModal"));
            bookingInfoModal.show();
        },
        newBooking() {
            this.error = "";
            this.bookingInModal = { GuestId: "", RoomNumber: "", CheckInDate: "", CheckOutDate: "", Status: "" };
            this.newBookingModal = new bootstrap.Modal(document.getElementById("newBookingModal"));
            this.newBookingModal.show();
        },
        updateView(booking) {
            this.update++;
            this.bookingInModal = booking;
        },
        async saveNewBooking() {
            const method = this.bookingInModal.id ? 'PUT' : 'POST';
            const url = this.API_URL + "/bookings/" + (this.bookingInModal.id ? this.bookingInModal.id : '');
            const rawResponse = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.bookingInModal)
            });
            if (rawResponse.ok) {
                this.newBookingModal.hide();
                this.update++;
            } else {
                const errorResponse = await rawResponse.json();
                this.error = errorResponse.error;
            }
        }
    }
};
