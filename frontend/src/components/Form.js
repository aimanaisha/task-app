import { useState, useRef } from 'react'
import { useTaskContext } from "../hooks/useTaskContext"
import {useAuthContext} from '../hooks/useAuthContext'


const Form = () => {

    const {dispatch} = useTaskContext()
    const { user } = useAuthContext()

    const titleRef = useRef()
    const descRef = useRef()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        if(!user){
            alert('You must be logged in')
            return
        }
        
        const request = await fetch('/api/tasks/',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body:JSON.stringify({title, desc})
        })

        const json = await request.json()

        if(request.ok){
            setTitle('')
            setDesc('')
            // console.log(json)
            dispatch({type: 'CREATE_TASK', payload: json})
            
        }
        if(!request.ok){
            alert(json.err)
        }
      
    }

    return ( 
        <form className='mx-auto flex flex-col w-[90%] my-10 md:w-1/3' onSubmit={formSubmitHandler}>
            <label htmlFor="name">Enter Your Task</label>
            <input className='border border-teal-700 py-2 px-2 rounded text-sm my-1 mb-4' value={title} onChange={(e) => setTitle(e.target.value)}  ref={titleRef} name="title" type="text" placeholder="Type Something"/>
            <label htmlFor="name">Enter the Task Description</label>
            <input className='border border-teal-700 py-2 px-2 rounded text-sm my-1 mb-4' value={desc} onChange={(e) => setDesc(e.target.value)} ref={descRef} name="desc" type="text" placeholder="Type Something"/>
            <button className='border border-emerald-500 w-20 h-8 rounded text-emerald-800 mx-auto' type="submit">Add</button>
        </form>
     );
}
 
export default Form;