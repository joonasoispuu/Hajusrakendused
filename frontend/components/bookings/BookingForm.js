export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <td>{{ id }}</td>
        </tr>
        <tr>
            <th>Guest ID</th>
            <td><input type="number" :value="GuestId" @input="$emit('update:GuestId', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Room Number</th>
            <td><input :value="RoomNumber" @input="$emit('update:RoomNumber', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Check-In Date</th>
            <td><input type="date" :value="CheckInDate" @input="$emit('update:CheckInDate', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Check-Out Date</th>
            <td><input type="date" :value="CheckOutDate" @input="$emit('update:CheckOutDate', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Status</th>
            <td>
                <select @change="$emit('update:Status', $event.target.value)" v-model="Status">
                    <option value="Booked">Booked</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Declined">Declined</option>
                    <option value="Checked In">Checked In</option>
                </select>
            </td>
        </tr>
    </table>`,
    props: ["id", "GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"],
    emits: ["update:GuestId", "update:RoomNumber", "update:CheckInDate", "update:CheckOutDate", "update:Status"]
}
