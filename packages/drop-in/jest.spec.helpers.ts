export async function waitFor(
  waitForChanges: () => Promise<any>,
  fn: () => boolean
): Promise<void> {
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      void waitForChanges().then(() => {
        if (fn()) {
          clearInterval(interval)
          resolve('')
        }
      })
    }, 100)
  })
}

export async function waitForMs(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}
