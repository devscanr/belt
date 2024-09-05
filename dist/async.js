export async function sleepValue(timeout, value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), timeout);
    });
}
export async function sleep(timeout) {
    await sleepValue(timeout, null);
}
