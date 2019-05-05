import { WorkerObjectFactoryConfig } from './worker-object-factory-config';

export interface WorkerObjectFactory<T, K extends WorkerObjectFactoryConfig> {
    /**
     * Builds object in a different thread,
     *
     * @param {K} config
     * @memberof WorkerObjectFactory
     */
    buildObjects(config: K): void;

    /**
     * Gives objects in a container in range if range is array of number and of size 2
     * It will be considered from and to.
     *
     * @param {string} containerKey
     * @param {Array<any>} range
     * @returns {Array<T>}
     * @memberof WorkerObjectFactory
     */
    getObjects(containerKey: string, range: Array<any>): Array<T>;

    /**
     * Deletes object from the factory with given keys.
     * @param {string} containerKey
     * @param {Array<string>} keys
     * @memberof WorkerObjectFactory
     */
    removeObjects(containerKey: string, keys: Array<string>);

    /**
     * Removes all objects from factory.
     *
     * @memberof WorkerObjectFactory
     */
    clear();
}