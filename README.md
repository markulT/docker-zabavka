# API

Пояснення цієї чухні

## Install
Не смій писати git push на ось це посилання. Бо я тобі шию скручу

А ось це щоб качнути:
```bash
git clone https://github.com/markulT/iptv.git
cd iptv
npm install
```
І запускай:
```bash
npm run start:dev
```

## User
Кароч робиш запит на посилання

Наприклад:
```typescript
const response = await api.get(`http://localhost:8000/api`)
console.log(response) // 'Hole comosta' - має написати
```
Замість 'get' пиши той метод який там вказано (Get або Post)

```typescript
const response = await api.post(`http://localhost:8080/api/login`,{
    //тутай вписуєш ті дані які я описав внизу
    login:login,
    password:password
},{withCredentials:true})
```
Але тепер ось цей response треба записати в Redux

Повна Redux thunk
```typescript
import {AsyncStorage} from 'react-native'

export const setUser = (user) => ({type:'SET_USER', user})

export const login = (login, password) => async (dispatch) => {
    const response = await api.post(`http://localhost:8080/api/login`,{
        
        login:login,
        password:password
    },{withCredentials:true})
    // токен для реєстрації потім поясню схєму, як логін і пароль роблять
    AsyncStorage.setItem('token',response.data.userData.accessToken)
    
    const user = JSON.parse(response.data.userData.fullProfile)
    
    dispatch(setUser(user))
}
```
Краще переглянь [відос](https://www.youtube.com/watch?v=BtJoy4G3N8U) щоб зрозуміти як це робить

## Auth
``` typescript
// /api

// Post /registration
interface BodyType {
    email:string,
    login:string,
    password:string,
    fullName:string,
    address:string,
    phone:string
}

// Post /login
interface BodyType {
    login:string,
    password:string
}

// Get /refresh
// тутай воно кароч само в файлі authApi робіт
```

