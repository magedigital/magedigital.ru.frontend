export default function setAsyncTimer(duration = 1_000): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}
