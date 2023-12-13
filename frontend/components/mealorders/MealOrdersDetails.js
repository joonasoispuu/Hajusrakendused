export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <td>{{ mealOrderInModal.id }}</td>
        </tr>
        <tr>
            <th>Booking ID</th>
            <td>{{ mealOrderInModal.BookingID }}</td>
        </tr>
        <tr>
            <th>Meal ID</th>
            <td>{{ mealOrderInModal.MealID }}</td>
        </tr>
        <tr>
            <th>Order Date</th>
            <td>{{ formatDate(mealOrderInModal.OrderDate) }}</td>
        </tr>
        <tr>
            <th>Status</th>
            <td>{{ mealOrderInModal.Status }}</td>
        </tr>
    </table>`,
    props: ["mealOrderInModal"],
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        }
    }
}
