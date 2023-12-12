export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>Room Number</th>
            <td>{{ roomInModal.RoomNumber }}</td>
        </tr>
        <tr>
            <th>Daily Cost</th>
            <td>{{ roomInModal.DailyCost }}</td>
        </tr>
        <tr>
            <th>Status</th>
            <td>{{ roomInModal.Status }}</td>
        </tr>
    </table>`,
    props: ["roomInModal"]
}
