export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <td>{{ id }}</td>
        </tr>
        <tr>
            <th>Meal Name</th>
            <td><input :value="MealName" @input="$emit('update:MealName', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Price</th>
            <td><input type="number" :value="Price" @input="$emit('update:Price', parseFloat($event.target.value))"></td>
        </tr>
    </table>`,
    props: ["id", "MealName", "Price"],
    emits: ["update:MealName", "update:Price"]
}
