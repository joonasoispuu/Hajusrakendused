export default {
    /*html*/
    template: `
    <table class="table table-striped">
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
    </table>`,
    props: ["guestInModal"]
}
