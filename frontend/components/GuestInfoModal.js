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
                        <td>{{ guestInModal.id }}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>{{ guestInModal.FirstName }}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{{ guestInModal.LastName }}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>{{ guestInModal.PhoneNumber }}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td>{{ guestInModal.EmailAddress }}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`,
props: {
    guestInModal: {}
}
}