import classes from './Navigation.module.css'
import { Link } from 'react-router-dom';
import { ReactComponent as LockIcon } from "../../assets/icon-2.svg";
import WCContext from '../wc_context';
import { useContext } from 'react';


function Navigation(props) {
    const context = useContext(WCContext)


    const closeMenu = ()=>{
        props.toggleMenu(false)
    }

    return ( 
    <nav className={classes.navigation}>
        <ul className={classes.navigation_list}>
            <li className={classes.navigation_item}>
            <Link to='/teachers' onClick={closeMenu}>Edit Teachers</Link>
            </li>
            <li className={classes.navigation_item}>
            <Link to='/courses' onClick={closeMenu}>Edit Courses</Link>
            </li>
        </ul>
        <div className={classes.message}>
            <p>Youre logged in as admin <br/>
            Log out <LockIcon className={classes.icon} onClick={ ()=>{context.toggleLogin();  props.toggleMenu(false)}}/></p>
            </div>
    </nav> );
}

export default Navigation;