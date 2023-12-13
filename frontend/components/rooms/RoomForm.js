export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>Room Number</th>
            <td><input :value="RoomNumber" @input="$emit('update:RoomNumber', $event.target.value)" :disabled="isEditing"></td>
        </tr>
        <tr>
            <th>Daily Cost</th>
            <td><input type="number" :value="DailyCost" @input="$emit('update:DailyCost', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Status</th>
            <td>
                <select @change="$emit('update:Status', $event.target.value)" v-model="Status">
                    <option value="Booked">Booked</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                </select>
            </td>
        </tr>

    </table>`,
    props: ["RoomNumber", "DailyCost", "Status", "isEditing"],
    emits: ["update:RoomNumber", "update:DailyCost", "update:Status"]
}
