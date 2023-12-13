export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <td>{{ bookingInModal.id }}</td>
        </tr>
        <tr>
            <th>Guest ID</th>
            <td>{{ bookingInModal.GuestId }}</td>
        </tr>
        <tr>
            <th>Room Number</th>
            <td>{{ bookingInModal.RoomNumber }}</td>
        </tr>
        <tr>
            <th>Check-In Date</th>
            <td>{{ bookingInModal.CheckInDate }}</td>
        </tr>
        <tr>
            <th>Check-Out Date</th>
            <td>{{ bookingInModal.CheckOutDate }}</td>
        </tr>
        <tr>
            <th>Status</th>
            <td>{{ bookingInModal.Status }}</td>
        </tr>
    </table>`,
    props: ["bookingInModal"]
}
