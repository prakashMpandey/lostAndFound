import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'

const Delete = (props) => {
    const { getTokenFromLs } = useAuth()
    const accessToken = getTokenFromLs()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/v1/post/deleteItem/${props.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            if (response.ok) {
                toast.success('Post deleted successfully!')
                
                console.log(data)
                const modal = document.getElementById(`deleteModal-${props.id}`);
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
                props.onSuccess()

            } else {
                toast.error(`Error deleting post: ${data.message || 'Unknown error'}`)
            }
        } catch (error) {
            toast.error('An error occurred while deleting the post.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn text-white btn-secondary bg-red-500 hover:bg-red-700"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal-${props.id}`}
            >
                Delete
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id={`deleteModal-${props.id}`}
                tabIndex="-1"
                aria-labelledby={`exampleModalLabel-${props.id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id={`exampleModalLabel-${props.id}`}
                            >
                                Do you want to delete your post?
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Congratulations on finding your lost item! If you no longer need this post, you can delete it now.
                            <br />
                            <br />
                            By deleting this post, you confirm that you have found your lost item and no longer need assistance.
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className={`btn btn-primary bg-orange-500 ${loading ? 'bg-gray-500' : 'bg-orange-500'}`}
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Delete
