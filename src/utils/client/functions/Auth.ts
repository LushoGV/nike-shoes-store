import { iFormContent } from "@/pages/auth"
import { ENDPOINTS } from "../../server/endpoints"

export const login = async ({email, password}:iFormContent) => {

    const res = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}) 
    })

    const data = await res.json()
    return data
}

export const signup = async (userData:iFormContent) => {
    try {
        const res = await fetch(ENDPOINTS.AUTH.SIGNUP, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) 
        })
    
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        const res = await fetch(ENDPOINTS.AUTH.LOGOUT)
        await res.json()
        return res
    } catch (error) {
        console.log(error)
    }
}

export const verifyUser = async (email:string):Promise<boolean> => {
    const res = await fetch(ENDPOINTS.AUTH.VERIFY_USER, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email}) 
    })

    const {emailFound} = await res.json()
    return emailFound
}

export const refreshToken = async ():Promise<{ status: number; name: string; }> => {
    const res = await fetch(ENDPOINTS.AUTH.REFRESH_TOKEN, {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const {name} = await res.json()

    return {status: res.status, name: name}
}

