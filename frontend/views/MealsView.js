import mealsList from "../components/meals/MealList.js";
import mealInfoModal from "../components/meals/MealInfoModal.js";
import newObjectModal from "../components/NewObjectModal.js";
import mealForm from "../components/meals/MealForm.js";

export default {
    template: `
        <div>
            <button class="btn btn-secondary" @click="newMeal">New Meal</button>
            <meals-list :key="update" @showModal="openModal"></meals-list>
            <meal-info-modal @mealsUpdated="updateView" :mealInModal="mealInModal"></meal-info-modal>
            <new-object-modal id="newMealModal" @save="saveNewMeal">
                <meal-form v-model:MealName="mealInModal.MealName" v-model:Price="mealInModal.Price"></meal-form>
                <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
            </new-object-modal>
        </div>
    `,
    components: {
        mealsList,
        mealInfoModal,
        newObjectModal,
        mealForm
    },
    data() {
        return {
            update: 0,
            mealInModal: { id: "", MealName: "", Price: 0 },
            newMealModal: {},
            error: ""
        };
    },
    methods: {
        openModal(meal) {
            this.mealInModal = meal;
            let mealInfoModal = new bootstrap.Modal(document.getElementById("mealInfoModal"));
            mealInfoModal.show();
        },
        newMeal() {
            this.error = "";
            this.mealInModal = { MealName: "", Price: 0 };
            this.newMealModal = new bootstrap.Modal(document.getElementById("newMealModal"));
            this.newMealModal.show();
        },
        updateView(meal) {
            this.update++;
            this.mealInModal = meal;
        },
        async saveNewMeal() {
            const method = this.mealInModal.id ? 'PUT' : 'POST';
            const url = this.API_URL + "/meals/" + (this.mealInModal.id ? this.mealInModal.id : '');
            const rawResponse = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.mealInModal)
            });
            if (rawResponse.ok) {
                this.newMealModal.hide();
                this.update++;
            } else {
                const errorResponse = await rawResponse.json();
                this.error = errorResponse.error;
            }
        }
    }
};
