import React from 'react'
import '../css/login.css'

export default function LoginPage() {
  return (
    <div className='w-full h-screen bg-rifle_green'>
      <form class="login bg-khaki_web">
        <input type="text" placeholder="Kullanıcı Adı" />
        <input type="password" placeholder="Şifre" />
        <button>Giriş Yap</button>
      </form>
    </div>

  )
}
