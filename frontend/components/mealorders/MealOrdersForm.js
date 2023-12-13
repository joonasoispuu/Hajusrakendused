export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <td>{{ id }}</td>
        </tr>
        <tr>
            <th>Booking ID</th>
            <td><input type="number" :value="BookingID" @input="$emit('update:BookingID', parseInt($event.target.value, 10))"></td>
        </tr>
        <tr>
            <th>Meal ID</th>
            <td><input type="number" :value="MealID" @input="$emit('update:MealID', parseInt($event.target.value, 10))"></td>
        </tr>
        <tr>
            <th>Order Date</th>
            <td><input type="date" :value="formatDate(OrderDate)" @input="$emit('update:OrderDate', $event.target.value)"></td>
        </tr>
        <tr>
            <th>Status</th>
            <td>
                <select @change="$emit('update:Status', $event.target.value)" v-model="Status">
                    <option value="Ordered">Ordered</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </td>
        </tr>
    </table>`,
    props: ["id", "BookingID", "MealID", "OrderDate", "Status"],
    emits: ["update:BookingID", "update:MealID", "update:OrderDate", "update:Status"],
    methods: {
        formatDate(date) {
            if (!date) return null;
            const d = new Date(date);
            let month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        }
    }
}
