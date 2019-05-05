import { WorkerUtils, WorkerProxyInput } from "../src/all";

describe('neat-webworker', () => {
    it('Should run the task', () => {
        let thread = WorkerUtils.runScript('http://localhost:9876/base/dist/worker.js')
        .on('message', function(message) {
            console.log('worker.js replied:', message);
        });

        thread.send(<WorkerProxyInput>{
            task: 'init'
        });

        setTimeout(() => {
            thread.send(<WorkerProxyInput>{
                task: 'getObjects',
                args: ['test', [1]]
            });
        }, 1000);
    });
});