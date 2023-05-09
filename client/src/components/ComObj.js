
function ComObj ({comment}) {
    return(
        <div className = "flex flex-container justify-between bg-charcoal-light text-blue m-6 p-3 rounded-lg">
            <p >{comment.content}</p>
            <p >posted by: {comment.user?.username}</p>
        </div>
    )
}

export default ComObj