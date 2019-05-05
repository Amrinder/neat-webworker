import { DefaultWorkerObjectFactoryConfig } from '../default-worker-object-factory/default-worker-object-factory-config';
import { WorkerTask } from '../../core/worker-task/worker-task';
import { WorkerProxyInput } from "../../core/worker-proxy/worker-proxy-input";
import { DefaultWorkerObjectFactory } from '../default-worker-object-factory/default-worker-object-factory';

class MockClass {
    public prop: any;
    constructor (prop) {
        this.prop = prop;
    }
}

class DefaultWorkerObjectFactoryTask  extends DefaultWorkerObjectFactory implements WorkerTask {
    private static _instance: WorkerTask;
    public static getInstance(): WorkerTask {
        if (!this._instance) {
            this._instance = new DefaultWorkerObjectFactoryTask();
        }

        return this._instance;
    }

    constructor() {
        super();
    }

    public init(): void {
        // Add config here
        this.buildObjects(this._buildConfig());
    }

    private _buildConfig(): DefaultWorkerObjectFactoryConfig {
        return {
            containerKey: 'test',
            objects: [{
                key: <number> 1,
                config: {
                    constructor: MockClass,
                    args: []
                }
            }]
        }
    }
}

var task = DefaultWorkerObjectFactoryTask.getInstance();

module.exports = function (input: WorkerProxyInput, done) {
    done(task[input.task + ''](...input.args));
}