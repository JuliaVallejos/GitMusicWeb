import React, { useState } from 'react'
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const Comment = ({comment}) => {
const [visible, setVisible] = useState(false)
const [updatedComment, setUpdatedComment] = useState('')

    const sendUpdate = () =>{
        //action de editar comment
    }

    const updateComment = () =>{
        setVisible(true)
    }
    const deleteComment = () =>{
        alert('mando edit')
    }

    const enterKey = (e) => {
        if (e.key === 'Enter') {
          sendUpdate()
        }
      }
      const handleInput = (e) => {
        setUpdatedComment(e.target.value)
      }

    return (
              <div className="comment">
        {visible ? (
          <>
            <div className="inputDiv update">
              <ImCancelCircle className="cancelBtn" onClick={() => setVisible(!visible)} />
              <input type="text" name="content" placeholder='Write your comment here' className="commentInput update" onKeyDown={enterKey} onChange={handleInput} value={updatedComment} autoFocus autoComplete="off" />
              <MdSend className="updateIcon" onClick={sendUpdate} id={comment._id} />
            </div>
          </>
        ) : (
            <>
              <div className="insideComment">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <p className="user">{comment.idUser.firstName}: </p>
                  <p className="content">{comment.comment}</p>
                </div>
                <div className="commentIcons">
                      <BsPencilSquare onClick={updateComment} className="editComment" />
                      <BsTrash onClick={deleteComment} className="editComment trash" id={comment._id} />
                </div>
              
              </div>
            </>
          )}
      </div>
    )
}

export default Comment
