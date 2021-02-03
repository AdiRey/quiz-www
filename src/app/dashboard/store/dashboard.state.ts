import { ChartModel, ChartWrappedModel } from "@shared/model/dashboard.model";


export interface DashboardState {
    categoryCount: ChartModel;
    quizCount: ChartModel;
    userCount: ChartModel
    activeCount: ChartModel;
    categoryQuizCount: ChartWrappedModel;
    chart: ChartWrappedModel;
    loadingChart: boolean;
    countTileLoadingNumber: number;
    categoryQuizLoading: boolean;
}

export const initialDashboardState: DashboardState = {
    categoryCount: null,
    quizCount: null,
    userCount: null,
    activeCount: null,
    categoryQuizCount: null,
    chart: null,
    loadingChart: false,
    countTileLoadingNumber: 0,
    categoryQuizLoading: false
}
