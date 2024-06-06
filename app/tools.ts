/**
 * @param {string} data
 * @todo add type and data mappings
 */
export const logIt = (data: string) => {
  const logTimestamp = new Date().toISOString()

  console.log(`[${ logTimestamp }] ${ data }]`)
}
