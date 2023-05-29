import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {

    const { dispatch } = useAuthContext()
    const [loading, setLoading] = useState(null)
    // const [error, setError] = useState(false)

    const signup = async (email, password) => {
        setLoading(true)
        // setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()
        if(!response.ok){
            setLoading(false)
            alert(json.error)
            console.log(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload:json})
            setLoading(false)
        }
    }
    return {signup, loading}
}