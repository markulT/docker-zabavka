import {useRouter} from "next/router";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setPasswordAction, setTariffAction} from "../../storage/reducers/payReducer";


export default function PaymentGateway() {

    const router = useRouter()
    const actionId = router.query.tariffId
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const submit = () =>{
        dispatch(setTariffAction(router.query.tariffId))
        dispatch(setPasswordAction(password))
        router.push(`/payments/${actionId}`)
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-grad_from to-grad_to">
            <div className="container h-screen mx-auto flex flex-col items-center justify-center">
                <div className={`group`}>
                    <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-transparent" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
                <button onClick={submit} className="bg-dead_violet rounded-3xl p-3 text-lg font-medium">Submit</button>
            </div>
        </div>
    )
}