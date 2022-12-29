import React from 'react'
import '../css/login.css'

export default function LoginPage() {
  return (
    <div className='w-full h-screen bg-rifle_green'>
      <form className="login bg-khaki_web ">
        <h1 className='font-righteous mb-[30px] text-4xl text-kombu_green text-right'>RedTape</h1>
        <input type="text" placeholder="Kullanıcı Adı" />
        <input type="password" placeholder="Şifre" />
        <button>Giriş Yap</button>
      </form>
    </div>

  )
}
