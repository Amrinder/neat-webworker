import * as ww from "threads";

export class WorkerUtils {
    public static runScript(script): any {
        let spawn = ww.spawn,
            thread = spawn(script);

        return thread;
    }
}