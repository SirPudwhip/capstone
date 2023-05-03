
function ComObj ({comment}) {
    return(
        <div class='mx-auto my-5'>
            <p>{comment.content}</p>
            <p>posted by: {comment.user.username}</p>
        </div>
    )
}

export default ComObj