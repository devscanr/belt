export async function sleepValue<V>(timeout: number, value: V): Promise<V> {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), timeout)
  })
}

export async function sleep(timeout: number): Promise<void> {
  await sleepValue(timeout, null)
}
