import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cancelMobileSubThunk, cancelSubThunk, getProfile} from "../../storage/reducers/authReducer";
import Router from "next/router";
import {router} from "next/client";

export default function CancelMobileSub() {
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state=>state.authReducer)

    const cancelSub = async () => {
        await dispatch(cancelMobileSubThunk({password:password}))
        await dispatch(getProfile())
        router.push('/profile')
    }
    useEffect(() => {
        if (!user.login) {
            Router.push({
                pathname: '/auth/login'
            })
        }
    }, [])
    return (
        <div>
            <div className="w-full min-h-screen bg-gradient-to-r from-grad_from to-grad_to">
                <div className="container h-screen mx-auto flex flex-col items-center justify-center">
                    <div className={`group`}>
                        <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-transparent" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Password</label>
                    </div>
                    <button disabled={password == ''} onClick={cancelSub} className={`bg-dead_violet rounded-3xl p-3 text-lg font-medium`}>Submit</button>
                </div>
            </div>
        </div>
    )
}