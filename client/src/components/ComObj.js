
function ComObj ({comment}) {
    return(
        <div >
            <p>{comment.content}</p>
            <p>posted by: {comment.user?.username}</p>
        </div>
    )
}

export default ComObj