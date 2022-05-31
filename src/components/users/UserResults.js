import { useContext } from 'react'
import Spinner from '../layout/Spinner'
import UserList from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults() {

  const { users, loading } = useContext(GithubContext)

  if(!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4'>
        {users.map((user) => (
          <UserList key={user.id} user={user}/>
        ))}
      </div>
    )
  } else {
    return (
      <Spinner />
    )
  }

}

export default UserResults