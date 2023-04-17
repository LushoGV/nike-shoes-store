import { iFormContent } from "@/layout/AuthLayout"
import { AUTH, DOMAIN } from "@/utils/endpoints"

export const login = async ({email, password}:iFormContent) => {

    const res = await fetch(AUTH.LOGIN, {
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
        const res = await fetch(AUTH.SIGNUP, {
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

export const verifyUser = async (email:string):Promise<boolean> => {
    console.log(AUTH.VERIFY_USER)
    const res = await fetch(AUTH.VERIFY_USER, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email}) 
    })

    const {emailFound} = await res.json()
    return emailFound
}

