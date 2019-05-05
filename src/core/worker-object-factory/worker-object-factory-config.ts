export interface WorkerObjectFactoryConfig {
    containerKey: string | number,
    objects: Array<{
        key: string | number,
        config: any
    }>
}