import React from 'react'
import PostCreate from './components/PostCreate'
import PostsShow from './components/PostsShow'


export default () => {
    return (<div>
        <h2 style={{ justifyContent: 'center', color: 'violet' }}>Welcome to blog App</h2>
        <PostCreate />
        <PostsShow />
    </div>)
}