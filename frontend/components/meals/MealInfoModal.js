import confirmationModal from "../ConfirmationModal.js";
import mealForm from "./MealForm.js";
import mealDetails from "./MealDetails.js";

export default {
    template: `
        <div id="mealInfoModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <meal-form v-if="isEditing" 
                                   v-model:id="modifiedMeal.id" 
                                   v-model:MealName="modifiedMeal.MealName" 
                                   v-model:Price="modifiedMeal.Price"></meal-form>
                        <meal-details v-else :mealInModal="mealInModal"></meal-details>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <template v-if="isEditing">
                                    <div class="col me-auto">
                                        <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-success mx-2" @click="saveModifiedMeal">Save</button>
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
        <confirmation-modal :target="'#mealInfoModal'" @confirmed="deleteMeal"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        mealForm,
        mealDetails
    },
    emits: ["mealsUpdated"],
    props: {
        mealInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedMeal: {}
        };
    },
    methods: {
        startEditing() {
            this.modifiedMeal = { ...this.mealInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedMeal() {
            const response = await fetch("http://localhost:8080/meals/" + this.modifiedMeal.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedMeal)
            });
            if (response.ok) {
                this.$emit("mealsUpdated", this.modifiedMeal);
                this.isEditing = false;
            } else {
                console.error("Failed to update meal:", response.statusText);
            }
        },
        async deleteMeal() {
            const response = await fetch("http://localhost:8080/meals/" + this.modifiedMeal.id, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.$emit("mealsUpdated");
            } else {
                console.error("Failed to delete meal:", response.statusText);
            }
        }
    }
};
