import React, { useState } from 'react'
import axios from 'axios'


export default ({ postId }) => {
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4001/posts/${postId}/comments`, { content: comment }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })

        setComment('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Comment</label>
                    <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <div><br />
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}