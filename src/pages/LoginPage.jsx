import React from 'react'
import '../css/login.css'

export default function LoginPage() {
  return (
    <div className='w-full h-screen bg-pine_tree'>
      <form className="login bg-xanadu">
        <h1 className='font-righteous mb-2 text-4xl text-pine_tree text-right'>RedTape</h1>
        {/* <input className='focus:ring-transparent' type="text" placeholder="Kullanıcı Adı" />
        <input className='focus:ring-transparent' type="password" placeholder="Şifre" /> */}
        <div class="relative z-0 mb-5">
          <input type="text" id="floating_standard" class="block py-2.5 px-0 w-full text-md text-laurel_green_light bg-transparent border-0 border-b-2 border-pine_tree appearance-none focus:outline-none focus:ring-0 focus:border-laurel_green peer" placeholder=" " />
          <label for="floating_standard" class="absolute text-md text-pine_tree duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-laurel_green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kullanıcı Adı</label>
        </div>
        <div class="relative z-0 mb-5">
          <input type="password" id="floating_standard" class="block py-2.5 px-0 w-full text-md text-laurel_green_light bg-transparent border-0 border-b-2 border-pine_tree appearance-none focus:outline-none focus:ring-0 focus:border-laurel_green peer" placeholder=" " />
          <label for="floating_standard" class="absolute text-md text-pine_tree duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-laurel_green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Şifre</label>
        </div>

        <button>Giriş Yap</button>
      </form>
    </div>

  )
}
