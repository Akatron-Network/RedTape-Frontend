import React from 'react'
import Request from '../libraries/Request'
import Auth from '../libraries/models/Auth'
import User from '../libraries/models/User';
import Current from '../libraries/models/Current';
import TurkeyProvDist from '../libraries/tools/TurkeyProvDist';
import EditCurrentModal from '../components/modals/EditCurrentModal';
import CurrentActivity from '../libraries/models/CurrentActivity';
import Stock from '../libraries/models/Stock';
import Order from '../libraries/models/Orders';


export default function Test() {
  //b BASIC TESTS ----------------------------
  const loginTest = async () => {
    console.log("GET");

    let resp = Request.loginRequest();
    console.log(resp);

    let get = await resp.get({
      username: "Hakan",
      password: "12345678"
    })
    if(get === null) {
      console.log("a")
    }

    localStorage.setItem('token', get.Data.token)
    console.log(get)
  }

  const registerTest = async () => {
    console.log("POST");

    let resp = Request.registerRequest();
    console.log(resp);

    let post = await resp.post({
      username: "Hakan",
      password: "12345678"
    })
    console.log(post);
  }

  const editTest = async () => {
    console.log("EDIT");

    let resp = Request.userRequest();
    console.log(resp);

    let edit = await resp.put({
      username: "Hakan",
      data: {
        password : "123456789",
      }
    })
    console.log(edit)
  }

  const deleteTest = async () => {
    console.log("DELETE");

    let resp = Request.registerRequest();
    console.log(resp);

    let dlt = await resp.delete()
    console.log(dlt);
  }

  const allUserTests = async () => {
    await registerTest();
    await loginTest();
    await editTest();
    await deleteTest();
  }

  //b AUTH ----------------------------------
  const authLogin = async () => {
    let resp = await Auth.login('Hakan', '12345678')
    console.log(resp);
  }

  const getLocalUser = () => {
    let resp = Auth.getLocalUser();
    console.log(resp)
  }
  
  const authLogout = async () => {
    let resp = await Auth.getLocalUser().logout();
    console.log(resp);
  }

  const refreshUserDetails = async () => {
    let resp = await Auth.getLocalUser().refreshDetails()
  }

  //b USER ----------------------------------
  const showUser = async () => {
    let where = 
    {
      where:{username: 'hakan'} //. lowercase 
    }

    let resp = await User.showUser(where);
    let resp_all = await User.showUser();
    
    console.log(resp)     //. Tekli
    console.log(resp_all) //. Çoklu
  }

  const createUser = async () => {
    let resp = await User.createUser('Deneme1', '12345678')
    console.log(resp)
  }

  const editUser = async () => {
    let details = await User.getUserDetails('Deneme1')
    let changes = {
      password : "123456789"
    }
    
    let resp = await details.editUser(changes);
    console.log(resp)
  }

  const deleteUser = async () => {
    let resp = await User.getUserDetails('Deneme1')
    let rmv = await resp.removeUser()
    console.log(rmv)
  }

  //b CURRENT ------------------------------
  const showCurrent = async () => {
    let where = 
    {
      skip: undefined,
      take: undefined,
      where: {}
    }

    let resp = await Current.showCurrent(where)
    console.log(resp)
  }

  const createCurrent = async () => {
    let data = {
      name: "Test-15",
      address: "",
      province: "",
      district: "",
      tax_office: "",
      tax_no: "",
      identification_no: "",
      phone: "",
      phone_2: "",
      mail: "a@a.com",
      description: "",
      code_1: "",
      code_2: "",
      code_3: "",
      code_4: "",
    }

    let resp = await Current.createCurrent(data);
    console.log(resp)
  }

  const editCurrent = async () => {
    let details = await Current.getCurrent(896)
    let changes = {
      name : "Deneme-16"
    }

    let resp = await details.editCurrent(changes)
    console.log(resp);
  }

  const deleteCurrent = async () => {
    let rmv = await Current.removeCurrent(892);
    console.log(rmv);
  }

  //b TOOLS -------------------------
  const getProvinceList = () => {
    let resp = new TurkeyProvDist()
    console.log(resp.getProvinceList())
  }

  const getDistrictList = () => {
    let resp = new TurkeyProvDist()
    console.log(resp.getDistrictList('Adana'));
  }

  //b CURRENT ACTIVITIES ----------------

  const showCurrentActivity = async () => {
    let where = 
    {
      skip: undefined,
      take: undefined,
      where: {
        date: {
          gte: "2022-01-15T00:00:00.000Z", //. Ne zamandan
          lte: "2022-01-30T00:00:00.000Z", //. Ne zamana kadar (Bugünun tarihi en fazla)
        }
      }
    }

    let resp = await CurrentActivity.showCurrentActivity(where);
    console.log(resp);
  }

  const createCurrentActivity = async () => {
    let data = {
      current_id: 541,
      balance: 5152.8,
      date: "2023-02-16T14:33:22.413Z",
      description: "",
      expiry_date: "2023-02-16T14:33:22.413Z",
    }

    let resp = await CurrentActivity.createCurrentActivity(data);
    console.log(resp);
  }

  const editCurrentActivity = async () => {
    let q = await CurrentActivity.getCurrentActivity(468);

    let details =  {
      balance: 5152.8,
      date: "2023-02-16T14:33:22.413Z",
      description: "",
      expiry_date: "2023-02-16T14:33:22.413Z",
    }

    let resp = await q.editCurrentActivity(details)
    console.log(resp);
  }

  const removeCurrentActivity = async () => {
    let remove = await CurrentActivity.removeCurrentActivity(467);
    console.log(remove);
  }

  //b STOCK -----------------------------
  const showStock = async () => {
    let query = {
      skip: undefined,
      take: undefined,
      where: {},
    }

    let resp = await Stock.showStock(query);
    console.log(resp);
  }

  const getStock = async () => {
    let resp = await Stock.getStock(162)
    console.log(resp);
  }

  const createStock = async () => {
    let data = {
      name: "TESTTEST",
      material: "A4 Kağıt",
      product_group: "Kağıt",
      unit: "AD",
      unit_2: "M2",
      conversion_rate: 0.8,
      buy_price: 11.25,
      sell_price: 20.15,
      code_1: "A",
      code_2: "B",
      code_3: "C",
      code_4: "D"
    }

    let resp = await Stock.createStock(data);
    console.log(resp); 
  }

  const editStock = async () => {
    let s = await Stock.getStock(162)

    let details = {
      name: "TESTTEST",
      material: "A4 Kağıt",
      product_group: "Kağıt",
      unit: "AD",
      unit_2: "M2",
      conversion_rate: 0.8,
      buy_price: 11.25,
      sell_price: 20.15,
      code_1: "A",
      code_2: "B",
      code_3: "C",
      code_4: "D"
    }

    let edit = await s.editStock(details);
    console.log(edit);
  }

  const removeStock = async () => {
    let remove = await Stock.removeStock(500);
    console.log(remove);
  }

  //b ORDER -----------------------------
  const createOrder = async () => {
    let data = {
      current_id: 541,
      date: "2023-01-31T11:52:00Z",
      delivery_date: "2023-01-31T11:52:00Z",
      order_source: "WEBSITE",
      invoiced: false,
      printed: false,
      total_fee: 100.50,
      code_1: "A",
      code_2: "B",
      code_3: "C",
      code_4: "D",
      items: [
        {
          row: 1,
          stock_id: 162,
          unit: "AD",
          amount: 24.5,
          price: 4.10,
          tax_rate: 0.18,
          description: "Test Açıklama"
        }
      ]
    }

    let create = await Order.createOrder(data);
    console.log(create);
  }

  return (
    <>
    <div className='bg-fogra_dark w-screen h-screen p-3'>

      <div className='p-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>REQUEST TESTS</h1>

        <button onClick={loginTest}  
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Login Test (GET)
        </button>

        <button onClick={registerTest}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Register Test (POST)
        </button>

        <button onClick={editTest}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit Test (PUT)
        </button>

        <button onClick={deleteTest}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Register Test (DELETE)
        </button>

        <button onClick={allUserTests}  
          className='ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          All Tests
        </button>
      </div>

      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>AUTH TESTS</h1>

        <button onClick={authLogin}  
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Auth Login Test
        </button>

        <button onClick={authLogout}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Auth Logout Test
        </button>

        <button onClick={refreshUserDetails}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Refresh User Details Test
        </button>

        <button onClick={getLocalUser}  
          className='ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          LocalStorage to Auth Test
        </button>

      </div>

      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>USER TESTS</h1>

        <button onClick={showUser}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Show User Test
        </button>

        <button onClick={createUser}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Create User Test
        </button>

        <button onClick={editUser}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit User Test
        </button>

        <button onClick={deleteUser}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Remove User Test
        </button>

      </div>
    
      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>CURRENT TESTS</h1>

        <button onClick={showCurrent}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Show User Test
        </button>

        <button onClick={createCurrent}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Create Current Test
        </button>

        <button onClick={editCurrent}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit Current Test
        </button>

        <button onClick={deleteCurrent}
          className='text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Remove Current Test
        </button>
      </div>
    
      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>PROVINCE TESTS</h1>

        <button onClick={getProvinceList}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get Province List Test
        </button>

        <button onClick={getDistrictList}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get District List Test
        </button>
      </div>

      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>CURRENT ACTIVITIES TESTS</h1>

        <button onClick={showCurrentActivity}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get Current Activities Test
        </button>

        <button onClick={createCurrentActivity}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Create Current Activities Test
        </button>

        <button onClick={editCurrentActivity}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit Current Activities Test
        </button>

        <button onClick={removeCurrentActivity}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Remove Current Activities Test
        </button>
      </div>

      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>STOCK TESTS</h1>

        <button onClick={showStock}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get All Stock Test
        </button>

        <button onClick={getStock}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get Stock Test
        </button>

        <button onClick={createStock}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Create Stock Test
        </button>

        <button onClick={editStock}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Edit Stock Test
        </button>

        <button onClick={removeStock}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Remove Stock Test
        </button>
      </div>

      <div className='p-3 mt-3 border border-blue-700 bg-oxford_blue rounded-md w-fit flex items-center'>
        <h1 className='mr-2 text-alica_blue w-40'>ORDER TESTS</h1>

        <button onClick={() => {}}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Get All Stock Test
        </button>

        <button onClick={createOrder}
          className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'>
          Create Order Test
        </button>
      </div>
    
      <EditCurrentModal />
    </div>

    </>
  )
}
