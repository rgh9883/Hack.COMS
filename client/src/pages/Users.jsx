import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3000/users")
                console.log(res)
                setUsers(res.data);
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])

    return (
        <div>
            <h1>ALL USERS</h1>
            <ol>
                {users.map(user => (
                    user.FirstName && <li key={user.id}>{user.FirstName + " " + user.LastName}</li>
                ))}
            </ol>
            
        </div>
    )
}

export default Users