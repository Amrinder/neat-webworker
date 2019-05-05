export interface WorkerTask {
    /**
     * Task which gets executed when worker is initialized.
     *
     * @memberof WorkerTask
     */
    init(): void;
}