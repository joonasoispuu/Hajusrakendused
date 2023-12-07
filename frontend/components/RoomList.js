export default {
    /*html*/
    template: `
    <table id="roomsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Room Number</th>
                <th>Daily Cost</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="room in rooms">
                <td @click="getRoom(room.RoomNumber)">{{ room.RoomNumber }}</td>
                <td>{{ room.DailyCost }}</td>
                <td>{{ room.Status }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            rooms: []
        }
    },
    async created() {
        this.rooms = await (await fetch("http://localhost:8080/rooms")).json()
    },
    methods: {
        getRoom: async function (roomNumber) {
            const roomInModal = await (await fetch("http://localhost:8080/rooms/" + roomNumber)).json()
            this.$emit("showModal", roomInModal)
        }
    }
}