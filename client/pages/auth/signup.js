import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../../storage/reducers/authReducer'
import c from './auth.module.css'
import {useRouter} from "next/router";
import {AiOutlineCheck} from "@react-icons/all-files/ai/AiOutlineCheck";
import {ImCross} from "@react-icons/all-files/im/ImCross";

export default function RegisterPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const readPolicy = useSelector(state => state.signupReducer.raedTermsOfPolicy)
    const [error, setError] = useState('')
    const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const registerSubmit = () => {
        if (!readPolicy) {
            return;
        }
        if(login=="" || password =="" || fullName=="" || phone=="" || email=="" || address==""){
            return
        }

        const emailCorrect = emailValidate.test(email)
        if(!emailCorrect) {
            setError('*Неправильная почта*')
            return;
        }
        dispatch(register(login, password,fullName,email,phone,address))
    }

    return (
        <div className="min-h-[100vh] w-full bg-gradient-to-r from-grad_from to-grad_to">
            <div className="container h-screen mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <form>

                        <div className="group">
                            <input type="text" value={login} onChange={(e)=>{setLogin(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Логин</label>
                        </div>
                        <div className="group">
                            <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Пароль</label>
                        </div>
                        <div className="group">
                            <input type="text" className="bg-transparent" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Полное имя</label>
                        </div>
                        <div className="group">
                            <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Email</label>
                        </div>

                        <div className="group">
                            <input type="text" className="bg-transparent" value={phone} onChange={(e)=>{setPhone(e.target.value)}} required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Номер телефона</label>
                        </div>

                        <div className="group">
                            <input type="text" className="bg-transparent" value={address} onChange={(e)=>{setAddress(e.target.value)}} required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Адресс</label>
                        </div>
                    </form>
                    <p className={'text-red-600'}>{error}</p>
                    <Link href={'/policy'}>
                        <a className={'text-xl p-6'}>
                            {readPolicy ?
                            <AiOutlineCheck  className={'inline text-3xl pr-1 text-green-400'}/>
                                : <ImCross className={'inline text-2xl pr-1 text-red-600'}/>
                            }
                            Политика Конфиденциальности
                        </a>
                    </Link>
                    <Link href="/auth/login">
                        <a className='pt-4 pb-4'>Уже есть акаунт ? Логин</a>
                    </Link>
                    <button onClick={registerSubmit} className="bg-dead_violet rounded-3xl p-3 text-lg font-medium">Отправить</button>
                </div>
            </div>
        </div>
    )
}

// export default function RegisterPage() {
//
//     const dispatch = useDispatch()
//
//     return (
//         <div>
//             <h2>Register: </h2>
//             <Formik
//                 initialValues={{
//                     login: '',
//                     password: '',
//                     fullName: ''
//                 }}
//                 // validate={values => {
//                 //     const error = {}
//                 //     if (!values.login || !values.password) {
//                 //         errors.login = 'required'
//                 //     }
//                 //     return errors
//                 // }}
//                 onSubmit={(values) => {
//                     alert(`${values.login} and ${values.password}`)
//                     dispatch(register(values.login, values.password, values.fullName))
//                 }}
//             >
//                 <Form>
//                     <label htmlFor='login'>Login</label>
//                     <Field className={c.input} id='login' name='login' placeholder='Login...'></Field>
//                     <label htmlFor='password'>Password :</label>
//                     <Field className={c.input} id='password' name='password' placeholder='Password...'></Field>
//                     <label htmlFor='fullName'>Full name :</label>
//                     <Field className={c.input} id='fullName' name='fullName' placeholder='Full Name...'></Field>
//                     <button type='submit'>Submit</button>
//                 </Form>
//             </Formik>
//             <Link href='/auth/login'>
//                 <a>Already have an account</a>
//             </Link>
//         </div>
//     )
// }
