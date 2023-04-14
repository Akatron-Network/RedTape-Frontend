import { useContext, createContext, useReducer, useRef } from 'react';
import User from '../libraries/models/User';
import Table from '../libraries/tools/Table';
import adminPanelReducer from '../reducer/adminPanelReducer'
import {Modal} from 'flowbite';
import { useMain } from './MainContext';

const AdminPanelContext = createContext();

const Provider = ({ children }) => {
  const { funcLoad } = useMain();

  //b State and Ref Management ----------------------------------------
  
  //- Current Details States
  const [state, dispatch] = useReducer(adminPanelReducer, {
    all_users: [],
    chosen_user_details: {username:"", details: {}},
    edit_user_modal: {},
    table_columns: ["KULLANICI ADI", "KAYIT TARİHİ", "SON GİRİŞ TARİHİ", "YETKİ"],
    table_rows: ["displayname", "register_date", "lastlogin_date", "admin"],
    render_table: (
      <>
        <table className="w-full text-sm text-left text-pine_tree">
          <thead className="text-xs text-prussian_blue bg-steel_blue_light">
            <tr>
              <th className="py-2 px-3 font-bold text-sm">KULLANICI ADI</th>
              <th className="py-2 px-3 font-bold text-sm">KAYIT TARİHİ</th>
              <th className="py-2 px-3 font-bold text-sm">SON GİRİŞ TARİHİ</th>
              <th className="py-2 px-3 font-bold text-sm">YETKİ</th>
              <th className="py-2 px-3 w-20 font-bold text-sm"><span className="sr-only">Düzenle</span></th>
            </tr>
          </thead>
        </table>
        <nav className="flex justify-between items-center py-2 px-3 pr-1 bg-steel_blue_light h-10" aria-label="Table navigation">
          <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">0</span> kayıt bulunmaktadır.</span>
        </nav>
      </>
    ),
  });

  //- Refs
  const userNameRef = useRef("")
  const userPasswordRef = useRef("")
  const userNameEditRef = useRef("")
  const userPasswordEditRef = useRef("")
  
  //? Users Func
  const showUserList = async () => {
    let t = new Table(User.showUser, state.table_columns, state.table_rows);
    let dt = await t.getData();

    dispatch({
      type: 'ALL_USERS',
      value: dt
    })

    t.setExecuteButtons([     //. Buttons in the table
      {
        func: (id) => funcLoad(getUserDetails, id),
        class: "golden-btn shadow-md px-1 w-8 rounded-[4px] active:scale-90",
        type: "edit",
        icon: "fa-solid fa-pen-to-square"
      },
      {
        func: (id) => funcLoad(removeUser, id),
        class: "ml-1 danger-btn shadow-md px-1 w-8 rounded-[4px] active:scale-90",
        type: "remove",
        icon: "fa-solid fa-xmark"
      }
    ])

    dispatch({               //. Get rendered table
      type: 'RENDER_TABLE',
      render: t.render()
    })
  }

  const createUser = async () => {
    if(userPasswordRef.current.value.length > 7) {

      let resp = await User.createUser(
        userNameRef.current.value,
        userPasswordRef.current.value,
        document.getElementById('default-checkbox').checked
      )

      showUserList();
      clearUserInputs();
    }
    else {
      document.getElementById("passwordWarn").classList.remove("hidden");
      document.getElementById("passwordWarn").classList.add("block");
    }
  }

  const clearUserInputs = () => {
    userNameRef.current.value = "",
    userPasswordRef.current.value = "",
    document.getElementById('default-checkbox').checked = false;

    document.getElementById("passwordWarn").classList.remove("block");
    document.getElementById("passwordWarn").classList.add("hidden");
  }
  
  const getUserDetails = async (dt) => {
    let details = await User.getUserDetails(dt.username)
    
    const show_user_modal = showUserModal();
    show_user_modal.show();
    
    dispatch({        //. Set user details
      type: 'CHOSEN_USER_DETAILS',
      value: dt
    })
    
    if (details.details.admin) document.getElementById('default-checkbox-edit').checked = true
    else document.getElementById('default-checkbox-edit').checked = false

    userNameEditRef.current.innerHTML = details.details.displayname;
    userPasswordEditRef.current.value = "";
  }

  const editUser = async (dt) => {
    let details = new User(dt)

    if (userPasswordEditRef.current.value !== "") {
      if (userPasswordEditRef.current.value.length > 7) {
        var changes = {
          password: "123456789",
          admin: document.getElementById('default-checkbox-edit').checked
        }
      }
      else {
        document.getElementById("passwordEditWarn").classList.remove("hidden");
        document.getElementById("passwordEditWarn").classList.add("block");
      }
    }
    else {
      var changes = {
        admin: document.getElementById('default-checkbox-edit').checked
      }
    }

    let resp = await details.editUser(changes);

    showUserList();
    hideUserModal();
  }

  const clearUserEditInputs = () => {
    userPasswordEditRef.current.value = "",
    document.getElementById('default-checkbox-edit').checked = false;
    
    document.getElementById("passwordEditWarn").classList.remove("block");
    document.getElementById("passwordEditWarn").classList.add("hidden");
  }

  const removeUser = async (dt) => {
    let resp = await User.getUserDetails(dt.username)
    let rmv = await resp.removeUser()
    
    showUserList();
  }

  //? Create modal object for show-hide etc.
  const showUserModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("editUserModal");
    const modal = new Modal(el, options);

    dispatch({        //. Set current modal object
      type: 'EDIT_USER_MODAL',
      value: modal
    })

    return modal;
  }

  const hideUserModal = () => {
    state.edit_user_modal.hide();

    dispatch({        //. Set current modal object
      type: 'EDIT_USER_MODAL',
      value: {}
    })

    clearUserEditInputs();
  }

  const admin_panel = {

    //, Refs
    userNameRef,
    userPasswordRef,
    userNameEditRef,
    userPasswordEditRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    clearUserEditInputs,
    clearUserInputs,
    createUser,
    editUser,
    hideUserModal,
    removeUser,
    showUserList,
  }

  return (
    <AdminPanelContext.Provider value={admin_panel}>
      {children}
    </AdminPanelContext.Provider>
  )
}

export const useAdminPanel = () => useContext(AdminPanelContext)
export default Provider;