export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <td>{{ mealInModal.id }}</td>
        </tr>
        <tr>
            <th>Meal Name</th>
            <td>{{ mealInModal.MealName }}</td>
        </tr>
        <tr>
            <th>Price</th>
            <td>{{ mealInModal.Price.toFixed(2) }}</td>
        </tr>
    </table>`,
    props: ["mealInModal"]
}
