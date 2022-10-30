import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cancelSubThunk, getFullProfile, getProfile} from "../../storage/reducers/authReducer";
import Router, {useRouter} from "next/router";


export default function CancelSub() {
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state=>state.authReducer)
    const router = useRouter()

    const cancelSub = async () => {
        await dispatch(cancelSubThunk({
            login:user.login,
            password:password
        }))
        await dispatch(getProfile())
        await dispatch(getFullProfile())
        Router.push('/profile')
    }
    useEffect(() => {
        if (!user.login) {
            Router.push({
                pathname: '/auth/login'
            })
        }
    }, [])

    return(
        <div className="w-full min-h-screen bg-gradient-to-r from-grad_from to-grad_to">
            <div className="container h-screen mx-auto flex flex-col items-center justify-center">
                <div className={`group`}>
                    <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-transparent" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
                <button onClick={cancelSub} className="bg-dead_violet rounded-3xl p-3 text-lg font-medium">Submit</button>
            </div>
        </div>
    )
}

