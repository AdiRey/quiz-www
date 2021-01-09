import { CategoryUpdateModel } from "@shared/model/category.model";


export interface CategoryState {
    editData: CategoryUpdateModel;
    loading: boolean;
}

export const initialCategoryState = {
    editData: null,
    loading: false
};
