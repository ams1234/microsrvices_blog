import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default ({ postId }) => {
    const [commentss, setCommentss] = useState([])
    const fetchComments = () => {
        axios.get(`http://localhost:4001/posts/${postId}/comments`).then((res) => {
            setCommentss(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => { fetchComments() }, [])
    return (

        <ul>
            {commentss.map((comment) => {
                return (
                    <li key={comment.id}>{comment.content}</li>
                )
            })}
        </ul>
    )
}