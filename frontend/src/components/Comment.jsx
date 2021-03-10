import React, { useState } from 'react'
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { connect } from 'react-redux'
import productActions from '../Redux/actions/productActions'
import { Alert } from 'rsuite';

const Comment = ({comment, idProduct, delComment, editComment, loggedUser}) => {
const [visible, setVisible] = useState(false)
const [updatedComment, setUpdatedComment] = useState('')

    const sendUpdate =async () =>{
        //action de editar comment
      await editComment({
        comment: updatedComment,
        idComment: comment._id
      })
      setVisible(false)
    }

    const updateComment = () =>{
        setVisible(true)
    }
    const deleteComment = async e =>{
      e.preventDefault()
      await delComment({
        idProduct,
        idComment: comment._id
      })
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
              {<ImCancelCircle className="cancelBtn" onClick={() => setVisible(!visible)} />}
              <input type="text" name="content" placeholder='Write your comment here' className="commentInput update" onKeyDown={enterKey} onChange={handleInput} value={updatedComment} autoFocus autoComplete="off" />
              <MdSend className="updateIcon" onClick={sendUpdate} id={comment._id} />
            </div>
          </>
        ) : (
            <>
              <div className="insideComment">
                <div className="textComment">
                  <h6>{comment.idUser.firstName}: </h6>
                  <p>{comment.comment}</p>
                </div>
                {loggedUser && loggedUser.userId === comment.idUser._id ? 
                <div className="commentIcons">
                  
                      <BsPencilSquare onClick={updateComment} className="editComment" />
                      <BsTrash onClick={deleteComment} className="editComment trash" id={comment._id} />
                    
                </div>
                : ''
                }
              </div>
            </>
          )}
      </div>
    )
}
const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts,
    loggedUser: state.userR.loggedUser
  }
}

const mapDispatchToProps = {
  delComment: productActions.delComment,
  editComment: productActions.updateComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
