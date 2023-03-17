import React, {useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../css/login.css'
import Auth from '../libraries/models/Auth'
import { useMain } from '../context/MainContext';

export default function Login() {
  var navigate = useNavigate();
  const { funcLoad } = useMain();

  const login_username = useRef("");
  const login_password = useRef("");


  const login = async (e) => {
    e.preventDefault();
    let usr = login_username.current.value
    let pss = login_password.current.value

    let lgn = await Auth.login(usr, pss)
    navigate("/");
  }

  return (
    <div className='w-full h-screen bg-prussian_blue'>
      <form className="login bg-shadow_blue" onSubmit={(e) => funcLoad(login, e)}>
        <h1 className='font-righteous mb-2 text-4xl text-oxford_blue text-right'>RedTape</h1>
        {/* <input className='focus:ring-transparent' type="text" placeholder="Kullanıcı Adı" />
        <input className='focus:ring-transparent' type="password" placeholder="Şifre" /> */}
        <div className="relative z-0 mb-5">
          <input ref={login_username} type="text" required className="block py-2.5 px-0 w-full text-md text-alica_blue bg-transparent border-0 border-b-2 border-oxford_blue appearance-none focus:outline-none focus:ring-0 focus:border-alica_blue peer" placeholder=" " />
          <label className="absolute text-md text-oxford_blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-alica_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kullanıcı Adı</label>
        </div>
        <div className="relative z-0 mb-5">
          <input ref={login_password} type="password" required className="block py-2.5 px-0 w-full text-md text-alica_blue bg-transparent border-0 border-b-2 border-oxford_blue appearance-none focus:outline-none focus:ring-0 focus:border-alica_blue peer" placeholder=" " />
          <label className="absolute text-md text-oxford_blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-alica_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Şifre</label>
        </div>

        <button><input className='cursor-pointer' type="submit" value="Giriş Yap" /></button>
      </form>
    </div>

  )
}
