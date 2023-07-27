import React from 'react'
import CardUser from '@components/Cards/cardUser/CardUser'


const ListUser = ({ users }) => {
  return (
    <div>
      {users.map((user => <CardUser key={user.id} user={user} />))}
      </div>
  )
}

export default ListUser