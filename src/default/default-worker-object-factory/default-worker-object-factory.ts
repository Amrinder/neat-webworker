import { DefaultWorkerObjectFactoryConfig } from './default-worker-object-factory-config';
import { WorkerObjectFactory } from './../../core/worker-object-factory/worker-object-factory';

export class DefaultWorkerObjectFactory implements
        WorkerObjectFactory<any, DefaultWorkerObjectFactoryConfig> {

    private _obContainer: {
        key?: string,
        objects?: {
            key: string,
            object: any
        }
    } = {};

    public buildObjects(config: DefaultWorkerObjectFactoryConfig): void {
        if (config) {
            let obCons = config.objects;
            if (obCons) {
                for (let obCon of obCons) {
                    if (!this._obContainer[config.containerKey]) {
                        this._obContainer[config.containerKey] = {};
                    }

                    this._obContainer[config.containerKey][obCon.key]
                            = new obCon.config.constructor(...obCon.config.args);
                }
            }
        }
    }

    public getObjects(containerKey: string, range: any[]): any[] {
        let res = []
        if (this._obContainer.hasOwnProperty(containerKey)) {
            if (range.length === 2) {
                range = this._getExpandedRange(range);
            }
            for (let index of range) {
                res.push(this._obContainer[containerKey][index]);
            }
        }
        
        return res;
    }

    public removeObjects(containerKey: string, keys: string[]): any[] {
        let res = [];

        if (this._obContainer.hasOwnProperty(containerKey)) {
            for (let index of keys) {
                res.push(this._obContainer[containerKey][index]);
                delete this._obContainer[containerKey][index];
            }
        } else {
            return res;
        }
    }

    public clear() {
        this._obContainer = {};
    }

    private _getExpandedRange(range: Array<number>): Array<number> {
        let start = range[0],
            end = range[1];

        for (let i = start + 1; i < end; i++) {
            range.push(i);
        }

        range.push(...range.splice(1, 1));

        return range;
    }
}