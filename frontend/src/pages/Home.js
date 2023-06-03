import { useEffect } from "react"
import Form from "../components/Form"
import { useTaskContext } from "../hooks/useTaskContext"
import Task from "../components/task"
import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
    const{ tasks, dispatch } = useTaskContext()
    const {user} = useAuthContext()

    useEffect(()=> {
        const fetchData = async () => {
            const response = await fetch('/api/tasks/',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_TASK', payload: json})
            }
            if(!response.ok){
                console.log(json.err)
            }
        }
        if(user){
            fetchData()
        }
    }, [dispatch, user])



    return (
      <div className="home flex-col flex bg-teal-50">
        <div>
        <Form/>
        <div>
            {tasks && tasks.map((task)=>{
                return(
                    <Task task={task} key={task._id} />
                )
            })}
        </div>
        </div>
        <div>
        </div>
      </div>
    )
  }
  
  export default Home