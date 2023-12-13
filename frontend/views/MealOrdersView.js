import mealOrdersList from "../components/mealorders/MealOrdersList.js";
import mealOrderInfoModal from "../components/mealorders/MealOrdersInfoModal.js";
import newObjectModal from "../components/NewObjectModal.js";
import mealOrderForm from "../components/mealorders/MealOrdersForm.js";

export default {
    template: `
        <div>
            <button class="btn btn-secondary" @click="newMealOrder">New Meal Order</button>
            <meal-orders-list :key="update" @showModal="openModal"></meal-orders-list>
            <meal-order-info-modal @mealOrdersUpdated="updateView" :mealOrderInModal="mealOrderInModal"></meal-order-info-modal>
            <new-object-modal id="newMealOrderModal" @save="saveNewMealOrder">
                <meal-order-form v-model:BookingID="mealOrderInModal.BookingID" 
                                 v-model:MealID="mealOrderInModal.MealID" 
                                 v-model:OrderDate="mealOrderInModal.OrderDate" 
                                 v-model:Status="mealOrderInModal.Status"></meal-order-form>
                <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
            </new-object-modal>
        </div>
    `,
    components: {
        mealOrdersList,
        mealOrderInfoModal,
        newObjectModal,
        mealOrderForm
    },
    data() {
        return {
            update: 0,
            mealOrderInModal: { id: "", BookingID: "", MealID: "", OrderDate: "", Status: "" },
            newMealOrderModal: {},
            error: ""
        };
    },
    methods: {
        openModal(mealOrder) {
            this.mealOrderInModal = mealOrder;
            let mealOrderInfoModal = new bootstrap.Modal(document.getElementById("mealOrderInfoModal"));
            mealOrderInfoModal.show();
        },
        newMealOrder() {
            this.error = "";
            this.mealOrderInModal = { BookingID: "", MealID: "", OrderDate: "", Status: "" };
            this.newMealOrderModal = new bootstrap.Modal(document.getElementById("newMealOrderModal"));
            this.newMealOrderModal.show();
        },
        updateView(mealOrder) {
            this.update++;
            this.mealOrderInModal = mealOrder;
        },
        async saveNewMealOrder() {
            const method = this.mealOrderInModal.id ? 'PUT' : 'POST';
            const url = this.API_URL + "/mealorders/" + (this.mealOrderInModal.id ? this.mealOrderInModal.id : '');
            const rawResponse = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.mealOrderInModal)
            });
            if (rawResponse.ok) {
                this.newMealOrderModal.hide();
                this.update++;
            } else {
                const errorResponse = await rawResponse.json();
                this.error = errorResponse.error;
            }
        }
    }
};
