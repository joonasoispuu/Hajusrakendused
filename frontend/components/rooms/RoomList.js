export default {
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
            <tr v-for="room in rooms" :key="room.RoomNumber">
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
        this.fetchData();
    },
    methods: {
        async getRoom(roomNumber) {
            try {
                const response = await fetch("http://localhost:8080/rooms/" + roomNumber);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const roomInModal = await response.json();
                this.$emit("showModal", roomInModal);
            } catch (e) {
                console.error(`Failed to fetch room with room number ${roomNumber}:`, e);
            }
        },
        async fetchData() {
            try {
                const response = await fetch("http://localhost:8080/rooms");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.rooms = await response.json();
            } catch (e) {
                console.error("Failed to fetch rooms:", e);
            }
        }
    }
}
