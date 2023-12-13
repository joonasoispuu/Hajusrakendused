import confirmationModal from "../ConfirmationModal.js";
import mealOrderForm from "./MealOrdersForm.js";
import mealOrderDetails from "./MealOrdersDetails.js";

export default {
    template: `
        <div id="mealOrderInfoModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <meal-order-form v-if="isEditing" 
                                         v-model:id="modifiedMealOrder.id" 
                                         v-model:BookingID="modifiedMealOrder.BookingID"
                                         v-model:MealID="modifiedMealOrder.MealID"
                                         v-model:OrderDate="modifiedMealOrder.OrderDate"
                                         v-model:Status="modifiedMealOrder.Status"
                        ></meal-order-form>
                        <meal-order-details v-else :mealOrderInModal="mealOrderInModal"></meal-order-details>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <template v-if="isEditing">
                                    <div class="col me-auto">
                                        <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-success mx-2" @click="saveModifiedMealOrder">Save</button>
                                        <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="col me-auto"></div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <confirmation-modal :target="'#mealOrderInfoModal'" @confirmed="deleteMealOrder"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        mealOrderForm,
        mealOrderDetails
    },
    emits: ["mealOrdersUpdated"],
    props: {
        mealOrderInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedMealOrder: {}
        };
    },
    methods: {
        startEditing() {
            this.modifiedMealOrder = { ...this.mealOrderInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedMealOrder() {
            const response = await fetch("http://localhost:8080/mealorders/" + this.modifiedMealOrder.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedMealOrder)
            });
            if (response.ok) {
                this.$emit("mealOrdersUpdated", this.modifiedMealOrder);
                this.isEditing = false;
            } else {
                console.error("Failed to update meal order:", response.statusText);
            }
        },
        async deleteMealOrder() {
            const response = await fetch("http://localhost:8080/mealorders/" + this.modifiedMealOrder.id, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.$emit("mealOrdersUpdated");
            } else {
                console.error("Failed to delete meal order:", response.statusText);
            }
        }
    }
};
