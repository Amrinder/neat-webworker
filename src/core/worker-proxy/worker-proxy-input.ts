export interface WorkerProxyInput {
    task: string;
    args: Array<any>
}

export type FunctionKeys<T> = {
    [P in keyof T]: T[P] extends Function ? P : never;
}

