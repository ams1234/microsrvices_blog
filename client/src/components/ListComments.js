import React from 'react'

export default ({ comments }) => {
    return (
        <ul>
            {comments.map((comment) => {
                return (
                    <li key={comment.id}>{comment.status === 'approved' ? comment.content : `You Comment is being ${comment.status}`}</li>

                )
            })}
        </ul>
    )
}