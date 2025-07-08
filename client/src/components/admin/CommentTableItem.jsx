import React from 'react'
import { assets } from '../../assets/QuickBlog-Assets/QuickBlog-Assets/assets'
import { useAppContext } from '../../context/Appcontext'
import toast from 'react-hot-toast'

const CommentTableItem = ({comment,fetchComment}) => {
     const {blog,createdAt,_id} = comment
     const BlogDate = new Date(createdAt)

     const {axios} = useAppContext()

     const approvedComment = async ()=>{
       try {
        const {data} = await axios.post("api/admin/approve-comment",{id:_id})
        if(data.success){
          toast.success(data.message)
          fetchComment()
        }
        else{
          toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
       }
     }
     const deleteComment = async ()=>{
       try {
        const confrom = window.confirm("are you sure you want to delete this comment")
        if(!confrom) return
        const {data} = await axios.post("api/admin/delete-comment",{id:_id})
        if(data.success){
          toast.success(data.message)
          fetchComment()
        }
        else{
          toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
       }
     }
  
  return (
    <tr className='order-y border-gary-300'>
       <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
        <br />
        <br />
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br />
        <b className='font-medium text-gray-600'>comment</b> : {comment.content}


       </td>
       <td>
        {BlogDate.toLocaleDateString()}
       </td>
        <td className='px-6 py-4'>
            <div className="inline-flex items-center gap-4">
                {!comment.isApproved ?
                 <img onClick={approvedComment} src={assets.tick_icon} alt="" className='w-5 hover:scale-110 transition-all cursor-pointer' /> : <p className='text-sm border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p> }
                 <img onClick={deleteComment} src={assets.bin_icon} alt=""  className='w-5 hover:scale-110 transition-all cursor-pointer'/>
            </div>

        </td>
    </tr>
  )
}

export default CommentTableItem