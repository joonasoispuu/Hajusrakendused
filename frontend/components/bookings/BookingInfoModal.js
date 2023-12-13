import confirmationModal from "../ConfirmationModal.js";
import bookingForm from "./BookingForm.js";
import bookingDetails from "./BookingDetails.js";

export default {
    template: `
        <div id="bookingInfoModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <booking-form v-if="isEditing"
                                      v-model:GuestId="modifiedBooking.GuestId"
                                      v-model:RoomNumber="modifiedBooking.RoomNumber"
                                      v-model:CheckInDate="modifiedBooking.CheckInDate"
                                      v-model:CheckOutDate="modifiedBooking.CheckOutDate"
                                      v-model:Status="modifiedBooking.Status"></booking-form>
                        <booking-details v-else :bookingInModal="bookingInModal"></booking-details>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <template v-if="isEditing">
                                    <div class="col me-auto">
                                        <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-success mx-2" @click="saveModifiedBooking">Save</button>
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
        <confirmation-modal :target="'#bookingInfoModal'" @confirmed="deleteBooking"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        bookingForm,
        bookingDetails
    },
    emits: ["bookingsUpdated"],
    props: {
        bookingInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedBooking: {}
        };
    },
    methods: {
        startEditing() {
            this.modifiedBooking = { ...this.bookingInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedBooking() {
            const response = await fetch("http://localhost:8080/bookings/" + this.modifiedBooking.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedBooking)
            });
            if (response.ok) {
                this.$emit("bookingsUpdated", this.modifiedBooking);
                this.isEditing = false;
            } else {
                console.error("Failed to update booking:", response.statusText);
            }
        },
        async deleteBooking() {
            const response = await fetch("http://localhost:8080/bookings/" + this.modifiedBooking.id, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.$emit("bookingsUpdated");
            } else {
                console.error("Failed to delete booking:", response.statusText);
            }
        }
    }
};
