import { ChartModel, ChartWrappedModel } from "@shared/model/dashboard.model";


export interface DashboardState {
    categoryCount: ChartModel;
    quizCount: ChartModel;
    userCount: ChartModel
    activeCount: ChartModel;
    chart: ChartWrappedModel;
    loadingChart: boolean;
    countTileLoadingNumber: number;
}

export const initialDashboardState: DashboardState = {
    categoryCount: null,
    quizCount: null,
    userCount: null,
    activeCount: null,
    chart: null,
    loadingChart: false,
    countTileLoadingNumber: 0
}
