import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'   
import {useSelector, useDispatch} from 'react-redux'   
import {logout, reset} from '../features/auth/authSlice'


function Header() {                       {/* this header is a nav bar at the top from where you can go to different pages */}
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)      
  

  const onLogout = () => {
    dispatch(logout())        
    dispatch(reset())
    navigate('/')     
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>    {/* remember that '/' links to the Dashboard */}
      </div>
      <ul>
        {user ? (                     
        <li>    
          <button className='btn' onClick={onLogout}>     {/* if user is logged in, show a logout button */}
            <FaSignOutAlt /> Logout 
          </button>
        </li>
        ) : (
        <>
        <li>                                              {/* else...show login and register links/buttons. REMEMBER: this is the HEADER. */}    
          <Link to='/login'>        {/* within this unordered list are two list elems, one for login and the other for register */}
            <FaSignInAlt /> Login   {/* when these Link elems are clicked, they take us to their respective page. Awsome*/}
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Register     {/* This is interesting syntax I've never seen before */}
          </Link>
        </li>
        </>)}

      </ul>
    </header>
    
  )
}

export default Header