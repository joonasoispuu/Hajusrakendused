export default {
    /*html*/
    template: `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <td>{{ id }}</td>
        </tr>
        <tr>
            <th>First Name</th>
            <td><input :value="FirstName" @input="$emit('update:FirstName', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td><input :value="LastName" @input="$emit('update:LastName', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Phone Number</th>
            <td><input :value="PhoneNumber" @input="$emit('update:PhoneNumber', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Email Address</th>
            <td><input :value="EmailAddress" @input="$emit('update:EmailAddress', $event.target.value)"></td>
        </tr>
    </table>`,
    props: ["id", "FirstName", "LastName", "PhoneNumber", "EmailAddress"],
    emits: ["update:FirstName", "update:LastName", "update:PhoneNumber", "update:EmailAddress"]
}
