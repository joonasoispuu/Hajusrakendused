export default {
    /*html*/
    template: `
    <table id="guestsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="guest in guests" :key="guest.id">
                <td @click="getGuest(guest.id)">{{ guest.FirstName }}</td>
                <td>{{ guest.LastName }}</td>
                <td>{{ guest.PhoneNumber }}</td>
                <td>{{ guest.EmailAddress }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            guests: []
        }
    },
    async created() {
        try {
            const response = await fetch("http://localhost:8080/guests");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.guests = await response.json();
        } catch (e) {
            console.error("Failed to fetch guests:", e);
        }
    },
    methods: {
        getGuest: async function (id) {
            try {
                const response = await fetch("http://localhost:8080/guests/" + id);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const guestInModal = await response.json();
                this.$emit("showModal", guestInModal);
            } catch (e) {
                console.error(`Failed to fetch guest with id ${id}:`, e);
            }
        }
    }
}
