import { User } from 'next-auth'

function AddPost({ user }: { user: User }) {
  console.log(user)
  return <div></div>
}
export default AddPost
