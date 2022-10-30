import {useState} from "react";
import Button from "../../comps/Button";
import {useDispatch} from "react-redux";
import {setPolicy} from "../../storage/reducers/signReducer";
import {useRouter} from "next/router";

export default function Policy() {
    const [read, setRead] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <div className={'min-h-[100%] font-[Inter] w-full bg-gradient-to-r from-grad_from to-grad_to'}>
            <div className='container min-h-screen mx-auto pt-4'>
                <div className="bg-grad_from pl-4 pr-4 rounded-3xl">


                    <div className={'flex mb-6 mt-6'}>
                        <input type="checkbox" className={'w-16'} id={'read'} checked={read} onChange={(e) => {
                            setRead(e.target.checked)
                        }}/>
                        <span className="text-xl">Я прочел всю эту хуету</span>

                    </div>
                    <button disabled={!read} className="bg-dead_violet rounded-3xl p-3 text-lg font-medium" onClick={() => {
                        dispatch(setPolicy(read))
                        router.push('/auth/signup')
                    }}>
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    )
}