import React  from "react";
import ".//nav.css"
const Nav = ({onRouteChnage,isSignin,restartdata})=>{
    if (!isSignin) {
        return (
            <nav  style={{display:'flex',justifyContent:"flex-end"}}>
                <p className=" signout f5 link  white  pa3 pointer bold" onClick={()=>{onRouteChnage("signin");restartdata()}}>Sign Out</p>
                <p className=" f5 link dim white  pa3 pointer bold" onClick={()=>onRouteChnage("profile")}>Profile</p>
            </nav>
        );
    }
    else{
        return (
            <nav style={{display:'flex',justifyContent:"flex-end"}}>
                <p className="f3 link dim white underline pa3 pointer bold" onClick={()=>onRouteChnage("signin")}>sign in</p>
                <p className="f3 link dim white underline pa3 pointer bold" onClick={()=>onRouteChnage("register")}>Register</p>
            </nav>
        );
    }
}
export default Nav;