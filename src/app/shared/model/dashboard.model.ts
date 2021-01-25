export interface ChartModel {
    id?: number;
    name: string;
    value: number;
}

export interface CountModel {
    count: number;
}

export interface ChartWrappedModel {
    content: Array<ChartModel>;
}
