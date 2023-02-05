//+ register(?) - deleteOwnUser(?)
import Request from '../Request'

export default class Auth {
  constructor(token, user_details, username, token_expiration) {
    this.token = token
    this.user_details = user_details
    this.username = username
    this.token_expiration = token_expiration
  }

  //? Set Informations to localStorage
  localSync () {  
    localStorage.clear();
    localStorage.setItem('token', this.token)
    localStorage.setItem('user_details', JSON.stringify(this.user_details))
    localStorage.setItem('username', this.username)
    localStorage.setItem('token_expiration', this.token_expiration)
  }

  async refreshDetails() {
    let resp = Request.registerRequest();
    
    let get = await resp.get();
    console.log(get)

    if(!get.Success) throw new Error('Refresh failed')

    localStorage.setItem('user_details', JSON.stringify(get.Data.user_details));
    this.user_details = get.Data.user_details;
  }

  async logout() {
    let resp = Request.loginRequest();
    let dlt = await resp.delete();

    localStorage.clear();

    if(!dlt.Success) throw new Error ('Logout failed')
    return dlt;
  }

  //* STATIC CONSTRUCT METHODS ------------------------------------------------

  static async login(username, password) {
    let resp = Request.loginRequest();                  //. Create an object

    let get = await resp.get({                          //. get GET Func
      username: username,
      password: password
    })

    if(!get.Success) throw new Error('Login failed')    //. Check Success
    
    let auth = new Auth(                                //. Create Auth Object with get func response
      get.Data.token,
      get.Data.user_details,
      get.Data.username,
      get.Data.token_expiration
    )

    auth.localSync();                                   //. Set Items to LocalStorage

    return auth;                                        //r return to Auth Object
  }
  
  //? Get informations from localStorage for create Auth Object
  static getLocalUser () {  

    if (!localStorage.getItem('token')) throw new Error('Token not found')  //. Check Token

    return new Auth(                                                        //r return localStorage items to Auth Object
      localStorage.getItem('token'),
      JSON.parse(localStorage.getItem('user_details')),
      localStorage.getItem('username'),
      localStorage.getItem('token_expiration')
    )
  }


}
