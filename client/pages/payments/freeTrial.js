import {useState} from "react";
import {useDispatch} from "react-redux";


export default function FreeTrial() {

    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const submitFreeTrial = async () => {

    }

    return (
        <>
            <p className="text-lg">Input text</p>
            <button onClick={submitFreeTrial}>Submit</button>
        </>
    )
}

