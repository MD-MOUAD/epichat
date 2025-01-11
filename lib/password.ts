import 'server-only'
import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}
export const comparePassword = async (password: string, hash: string) => {
  const passwordsMatch = await bcrypt.compare(password, hash)
  return passwordsMatch
}
