export default {
    /*html*/
    template: `
<div id="roomInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Room Number</th>
                        <td>{{roomInModal.RoomNumber}}</td>
                    </tr>
                    <tr>
                        <th>Daily Cost</th>
                        <td v-if="isEditing"><input v-model.number="modifiedRoom.DailyCost" type="number"></td>
                        <td v-else>{{roomInModal.DailyCost}}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td v-if="isEditing"><input v-model="modifiedRoom.Status"></td>
                        <td v-else>{{roomInModal.Status}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedRoom">Save</button>
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
    emits: ["roomUpdated"],
    props: {
        roomInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedRoom: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedRoom = { ...this.roomInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedRoom() {
            console.log("Saving:", this.modifiedRoom)
            const rawResponse = await fetch("http://localhost:8080/rooms/" + this.modifiedRoom.RoomNumber, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedRoom)
            });
            console.log(rawResponse);
            this.$emit("roomUpdated", this.modifiedRoom)
            this.isEditing = false
        }
    }
}
