import { useAuthContext } from "./useAuthContext"
import { useTaskContext } from "./useTaskContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: taskDispatch} = useTaskContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        taskDispatch({type:'SET_TASK', payload: null})
    }
    return {logout}
}