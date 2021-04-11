// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const next = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.trunc((d + Math.random() * 16) % 16)
    d = Math.floor(d / 16)
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid
}
export default { next }
