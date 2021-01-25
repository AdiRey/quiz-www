import { UserModel } from "@shared/model/root.model";

export interface RootState {
    user: UserModel;
}

export const initialRootState = {
    user: null
};
