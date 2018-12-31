export function checkStatus(res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res
  }
  throw new Error(res)
}
