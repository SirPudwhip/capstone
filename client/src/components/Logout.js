import useEffect from 'react'


function Logout () {

    useEffect(() => {
        fetch('/logout'), {
            method: 'DELETE',
        }
    }, [])

    return (
        <>You have been logged out!</>
    )
}

export default Logout