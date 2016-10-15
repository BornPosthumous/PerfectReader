declare function setTimeout(callback: () => void, timeout: number): void

async function Test() {
  try {
    const val = await asyncFn()
  } catch(e) {
    console.log(e)
  }
}

function asyncFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(false), 100)
  })
}

Test()