import { UserContext, UserContextProvider } from "../../context/user-context";
import { useContext } from "react";

export default function Profile(){
    return (
        <ProfileContent/>
    )
}

function ProfileContent(){
    const {user} = useContext(UserContext);
    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
        </div>
    )
}