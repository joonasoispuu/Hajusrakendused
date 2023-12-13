export default {
    template: `
    <table id="mealOrdersTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Booking ID</th>
                <th>Meal ID</th>
                <th>Order Date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="mealOrder in mealOrders" :key="mealOrder.id">
                <td @click="getMealOrder(mealOrder.id)">{{ mealOrder.id }}</td>
                <td>{{ mealOrder.BookingID }}</td>
                <td>{{ mealOrder.MealID }}</td>
                <td>{{ formatOrderDate(mealOrder.OrderDate) }}</td>
                <td>{{ mealOrder.Status }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            mealOrders: []
        }
    },
    async created() {
        this.fetchData();
    },
    methods: {
        async getMealOrder(mealOrderId) {
            try {
                const response = await fetch("http://localhost:8080/mealorders/" + mealOrderId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const mealOrderInModal = await response.json();
                this.$emit("showModal", mealOrderInModal);
            } catch (e) {
                console.error(`Failed to fetch meal order with ID ${mealOrderId}:`, e);
            }
        },
        async fetchData() {
            try {
                const response = await fetch("http://localhost:8080/mealorders");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.mealOrders = await response.json();
            } catch (e) {
                console.error("Failed to fetch meal orders:", e);
            }
        },
        formatOrderDate(date) {
            return date ? new Date(date).toLocaleDateString() : '';
        }
    }
}
