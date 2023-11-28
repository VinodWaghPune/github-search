import React from 'react'

function User({user}) {
  return (
    <div className='bg-slate-500 card'>

        
        
        <h2 className='card-title'>{user.login}</h2>
        <div className='card-body'>

        <img src={user.avatar_url} alt="img"  className='w-20 h-20 rounded-full'/>
        <p>Repo - {user.url}</p>
        </div>
       
        
        </div>
  )
}

export default User