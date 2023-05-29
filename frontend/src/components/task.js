import { useTaskContext } from "../hooks/useTaskContext"
import {useAuthContext} from '../hooks/useAuthContext'


const Task = ({task}) => {

    const{ dispatch } = useTaskContext()
    const {user} = useAuthContext()

    const removeTaskHandler = async () => {
        
        if(!user){
            alert('You must be logged in')
            return
        }

        const response = await fetch('/api/tasks/'+ task._id,{
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'DELETE_TASK', payload: json})
        }
        if(!response.ok){
            console.log(json.err)
        }
    }

    return ( 

                    <div className="flex justify-between mx-auto bg-amber-200 border-2 border-orange-300 rounded-md my-4 px-5 py-4 w-[330px] md:w-1/3">
                        <div>
                        <h2 className="text-xl text-orange-900">{task.title}</h2>
                        <p className="text-slate-900 text-sm">{task.desc}</p>
                        </div>
                        <button onClick={removeTaskHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-orange-900">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    </div>
     );
}
 
export default Task;