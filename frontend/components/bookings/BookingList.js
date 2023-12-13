export default {
    template: `
    <table id="bookingsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Guest ID</th>
                <th>Room Number</th>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
                <td @click="getBooking(booking.id)">{{ booking.id }}</td>
                <td>{{ booking.GuestId }}</td>
                <td>{{ booking.RoomNumber }}</td>
                <td>{{ booking.CheckInDate }}</td>
                <td>{{ booking.CheckOutDate }}</td>
                <td>{{ booking.Status }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            bookings: []
        }
    },
    async created() {
        this.fetchData();
    },
    methods: {
        async getBooking(id) {
            try {
                const response = await fetch("http://localhost:8080/bookings/" + id);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const bookingInModal = await response.json();
                this.$emit("showModal", bookingInModal);
            } catch (e) {
                console.error(`Failed to fetch booking with id ${id}:`, e);
            }
        },
        async fetchData() {
            try {
                const response = await fetch("http://localhost:8080/bookings");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.bookings = await response.json();
            } catch (e) {
                console.error("Failed to fetch bookings:", e);
            }
        }
    }
}
