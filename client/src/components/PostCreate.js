import React, { useState } from 'react'
import axios from 'axios'

export default () => {
    const [post, setPost] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(post)
        axios.post('http://localhost:3055/posts', { "title": post }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        setPost('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input id="title" style={{ width: '30%', borderColor: 'blue' }} className="form-control" type="text" value={post} onChange={e => { setPost(e.target.value) }} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}