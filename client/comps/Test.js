import {useRouter} from "next/router";

export default function Test() {
    const router = useRouter()
    return (
        <div>
            <button className="bg-red-900" onClick={()=>{
                console.log('Clicked')
            }}>Кнопка</button>
        </div>
    )
}