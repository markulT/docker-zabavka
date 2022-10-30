import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../storage/reducers/authReducer'
import { getUsersList } from '../../storage/reducers/usersReducer'
import c from './auth.module.css'
import Test from "../../comps/Test";
import {useRouter} from "next/router";
import Button from "../../comps/Button";

export default function LoginPage() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [userLogin, setUserLogin] = useState('')
    const [password, setPassword] = useState('')
    const userExists = useSelector(state=>state.authReducer.login)

    const submitLogin = async () => {
        if (userLogin == "" || password == '') {
            return
        }
        await dispatch(login(userLogin, password))
        router.push('/profile')
    }
    useEffect(()=>{
        if (userExists) {
            router.push('/profile')
        }
    },[])

    return (
        <div className="min-h-[100vh] w-full bg-gradient-to-r from-grad_from to-grad_to">
            <div className="container h-screen mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <form>

                        <div className="group">
                            <input type="text" value={userLogin} onChange={(e)=>{setUserLogin(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Логин</label>
                        </div>
                        <div className="group">
                            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Пароль</label>
                        </div>
                        <Link href="/auth/signup">
                            <a>У вас нет акаунта? Зарегистрируйтесь !</a>
                        </Link>

                    </form>
                    <button onClick={submitLogin} className="bg-dead_violet rounded-3xl p-3 text-lg font-medium">Отправить</button>
                </div>
            </div>
        </div>
    )
}
// <Formik
//     initialValues={{ login: '', password: '' }}
//     onSubmit={(values, { setSubmiting }) => {
//         dispatch(login(values.login, values.password))
//     }}
// >
//     <Form>
//         <label htmlFor='login'>Login</label>
//         <Field className={c.input} id='login' name='login' placeholder='Login...'></Field>
//         <label htmlFor='password'>Password</label>
//         <Field className={c.input} id='password' name='password' placeholder='Password...'></Field>
//         <button type='submit'>Submit</button>
//     </Form>
// </Formik>
// export default function LoginPage() {
//
//     let usersList = useSelector(state => state.usersReducer.usersList)
//     const userProfile = useSelector(state => state.authReducer)
//
//
//     const dispatch = useDispatch()
//     useEffect(() => {
//
//     }, [])
//     return (
//         <div>
//             <h2>Login: </h2>
//             <Formik
//                 initialValues={{ login: '', password: '' }}
//                 // validate={values => {
//                 //     const error = {}
//                 //     if (!values.login || !values.password) {
//                 //         errors.login = 'required'
//                 //     }
//                 //     return errors
//                 // }}
//                 onSubmit={(values, { setSubmiting }) => {
//                     dispatch(login(values.login, values.password))
//                 }}
//             >
//                 <Form>
//                     <label htmlFor='login'>Login</label>
//                     <Field className={c.input} id='login' name='login' placeholder='Login...'></Field>
//                     <label htmlFor='password'>Password</label>
//                     <Field className={c.input} id='password' name='password' placeholder='Password...'></Field>
//                     <button type='submit'>Submit</button>
//                 </Form>
//             </Formik>
//             <Link href='/auth/signup'>
//                 <a>Don`t have an account ?</a>
//             </Link>
//             <div>
//                 <button onClick={() => {
//                     dispatch(getUsersList())
//                 }}>Get users</button>
//                 {usersList.map((user) => <div>
//                     {user.login}
//                 </div>)}
//                 <Link href='/'>
//                     <a>Home</a>
//                 </Link>
//                 <button onClick={()=>{
//                     console.log(userProfile )
//                 }}>User</button>
//
//                 <Test></Test>
//             </div>
//         </div>
//     )
// }
