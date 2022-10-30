import {AiOutlineCheck} from "@react-icons/all-files/ai/AiOutlineCheck";

export default function Popup({status}) {

    return (
        <div className={`absolute top-0 right-0 ${status === 'success' ? 'bg-green-500' :'bg-red-700'} rounded-3xl`}>
            <div className={'flex'}>
                <AiOutlineCheck />
                <div>Lorem</div>
            </div>
        </div>
    )
}