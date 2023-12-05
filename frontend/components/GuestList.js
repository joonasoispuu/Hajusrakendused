export default {
    template: `
    <table id="guestsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Email Address</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="guest in guests" @click="getGuest(guest.id)">
                <td class="clickable">{{ guest.FirstName }} {{ guest.LastName }}</td>
                <td class="clickable">{{ guest.EmailAddress }}</td>
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
        this.guests = await (await fetch("http://localhost:8080/guests")).json()
    },
    methods: {
        getGuest: async function (id) {
            const guestInModal = await (await fetch("http://localhost:8080/guests/" + id)).json()
            this.$emit("showModal", guestInModal)
        }
    }
}
