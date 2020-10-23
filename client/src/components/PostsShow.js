import React, { useEffect, useState } from "react"
import axios from 'axios'
import CommentCreate from './CommentCreate'
import ListComments from './ListComments'

export default () => {
    const [posts, setPosts] = useState({})

    const fetchPosts = () => {
        axios.get("http://localhost:3055/posts").then((res) => {
            setPosts(res.data)
            //console.log(posts)
        }).catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const renderedPost = Object.values(posts).map(ele => {
        return (
            <div className='card' key={ele.id} style={{ width: "30%", alignSelf: 'center', margin: '20px' }}>
                <div className='card-body'>
                    <h2 style={{ fontFamily: '-moz-initial', 'alignSelf': 'center' }}>{ele.title}</h2>
                    <ListComments postId={ele.id} />
                    <CommentCreate postId={ele.id} />
                </div>
            </div>
        )
    })
    return (
        <div className="d-flex flex-column bd-highlight mb-3">
            <h1 style={{ 'alignSelf': 'center', 'color': 'blue', fontFamily: '-moz-initial' }}>posts</h1>
            { renderedPost}
        </div>
    )
}