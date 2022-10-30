import Link from "next/link";
import Button from "./Button";
import {useRouter} from "next/router";
import {useState} from "react";
import Script from "next/script";
import {useSelector} from "react-redux";
import {BiUserCircle} from "@react-icons/all-files/bi/BiUserCircle";
import {BiHome} from "@react-icons/all-files/bi/BiHome";


export default function Navbar() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const login = useSelector(state => state.authReducer.login)
    return (
        <nav className="p-5 bg-transparent w-full z-[999999]">
            <div className="container mx-auto">
                <div className="md:flex w-full align-middle justify-between items-center">
                    <div className="text-5xl font-[Poppins] cursor-pointer h-[48px] w-auto" onClick={() => {
                        router.push('/')
                    }}>
                        <img src="/PickRestTV/Lending/resttv.png" className="h-full w-auto" alt=""/>
                    </div>
                    <div onClick={() => {
                        setOpen(!open)
                    }} className="text-5xl absolute right-8 top-6 cursor-pointer md:hidden">
                        <ion-icon name={open ? 'close' : 'menu-outline'}></ion-icon>
                    </div>
                    <div
                        className={`md:flex items-center z-20 md:pb-0 pb-12 absolute md:static bg-nav_black md:bg-transparent w-full md:w-auto left-0 md:pl-0 pl-9 transition-all duration-200 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
                        <div className="align-middle flex-1 md:ml-8 text-xl md:my-0 my-7">
                            <Link className="inline-block align-middle flex-1 md:ml-8 text-xl" href={"/"}>
                                <a className="hover:text-gray-400 flex items-center">
                                    <BiHome className={'inline text-2xl mr-2'} />
                                    Главная
                                </a>
                            </Link>
                        </div>
                        {login ?
                            <div className="align-middle flex-1 md:ml-8 text-xl md:my-0 my-7">
                                <Link href={"/profile"}>
                                    <a className="hover:text-gray-400 flex items-center">
                                        <BiUserCircle className={'inline text-2xl mr-2'} />
                                        {login}
                                    </a>
                                </Link>
                            </div>
                            :
                            <>
                                <div className="align-middle flex-1 md:ml-8 text-xl md:my-0 my-7">
                                    <Link href={"/auth/login"}>
                                        <a className="hover:text-gray-400">Логин</a>
                                    </Link>
                                </div>
                                <Button>Подключиться</Button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}