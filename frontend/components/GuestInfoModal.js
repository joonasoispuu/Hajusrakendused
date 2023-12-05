export default {
    template: `
<div id="guestInfoModal" class="modal fade" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Guest Information</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table">
                    <tr>
                        <th>ID</th>
                        <td>{{ isEditing ? modifiedGuest.id : guestInModal.id }}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td v-if="isEditing"><input v-model="modifiedGuest.FirstName"></td>
                        <td v-else>{{ guestInModal.FirstName }}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td v-if="isEditing"><input v-model="modifiedGuest.LastName"></td>
                        <td v-else>{{ guestInModal.LastName }}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td v-if="isEditing"><input v-model="modifiedGuest.PhoneNumber"></td>
                        <td v-else>{{ guestInModal.PhoneNumber }}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td v-if="isEditing"><input v-model="modifiedGuest.EmailAddress"></td>
                        <td v-else>{{ guestInModal.EmailAddress }}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedGuest">Save</button>
                    <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-warning" @click="startEditing">Edit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </template>
            </div>
        </div>
    </div>
</div>
`,
    props: {
        guestInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedGuest: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedGuest = { ...this.guestInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedGuest() {
            console.log("Saving:", this.modifiedGuest)
            const rawResponse = await fetch("http://localhost:8080/guests/" + this.modifiedGuest.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedGuest)
            });
            console.log(rawResponse);
            this.$emit("guestsUpdated", this.modifiedGuest)
            this.isEditing = false
            location.reload();
        }
    }
}
