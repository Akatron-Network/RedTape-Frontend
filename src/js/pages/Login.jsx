import React, {useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../css/login.css'
import Auth from '../libraries/models/Auth'

export default function Login() {
  var navigate = useNavigate();

  const login_username = useRef("");
  const login_password = useRef("");


  const login = async (e) => {
    e.preventDefault();
    let usr = login_username.current.value
    let pss = login_password.current.value

    let warn = document.getElementById('loginWarn')

    if (!warn.classList.contains("hidden")) warn.classList.remove('hidden')

    try {
      let lgn = await Auth.login(usr, pss)
      navigate("/dashboard");
    } catch (error) {
      warn.classList.remove('hidden')
    }
  }

  return (
    <div className='w-full h-screen bg-prussian_blue'>
      <form className="login bg-queen_blue" onSubmit={(e) => login(e)}>
        <h1 className='font-righteous mb-2 text-4xl text-oxford_blue text-right'>Verna</h1>
        {/* <input className='focus:ring-transparent' type="text" placeholder="Kullanıcı Adı" />
        <input className='focus:ring-transparent' type="password" placeholder="Şifre" /> */}
        <div className="relative z-0 mb-5">
          <input ref={login_username} type="text" required className="block py-2.5 px-0 w-full text-md text-alica_blue_light bg-transparent border-0 border-b-2 border-oxford_blue appearance-none focus:outline-none focus:ring-0 focus:border-alica_blue peer" placeholder=" " />
          <label className="absolute text-md text-oxford_blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-alica_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kullanıcı Adı</label>
        </div>
        <div className="relative z-0 mb-5">
          <input ref={login_password} type="password" required className="block py-2.5 px-0 w-full text-md text-alica_blue_light bg-transparent border-0 border-b-2 border-oxford_blue appearance-none focus:outline-none focus:ring-0 focus:border-alica_blue peer" placeholder=" " />
          <label className="absolute text-md text-oxford_blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-alica_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Şifre</label>
        </div>
        <div id='loginWarn' className='mb-5 text-xs text-red-700 font-bold hidden'>Kullanıcı Adı ya da Şifre hatalı!</div>
        <button><input className='cursor-pointer' type="submit" value="Giriş Yap" /></button>
      </form>
    </div>

  )
}
