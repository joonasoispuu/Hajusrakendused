export default {
    template: `
    <table id="mealsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Meal Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="meal in meals" :key="meal.id">
                <td @click="getMeal(meal.id)">{{ meal.id }}</td>
                <td>{{ meal.MealName }}</td>
                <td>{{ meal.Price }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            meals: []
        }
    },
    async created() {
        this.fetchData();
    },
    methods: {
        async getMeal(mealId) {
            try {
                const response = await fetch("http://localhost:8080/meals/" + mealId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const mealInModal = await response.json();
                this.$emit("showModal", mealInModal);
            } catch (e) {
                console.error(`Failed to fetch meal with ID ${mealId}:`, e);
            }
        },
        async fetchData() {
            try {
                const response = await fetch("http://localhost:8080/meals");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.meals = await response.json();
            } catch (e) {
                console.error("Failed to fetch meals:", e);
            }
        }
    }
}
