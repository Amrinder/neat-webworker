import { WorkerObjectFactoryConfig } from './../../core/worker-object-factory/worker-object-factory-config';

export class DefaultWorkerObjectFactoryConfig implements WorkerObjectFactoryConfig {
    containerKey:  string | number;;
    objects: Array<{
        key: string | number;
        config: {
            constructor: {new(...args): any},
            args: Array<any>
        }
    }>;
}