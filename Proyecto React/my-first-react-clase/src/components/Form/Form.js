import MyInput from "./MyInput";
import "../../style/form.css";
import { UserContext, UserContextProvider } from "../../context/user-context";
import { useContext } from "react";

export default function Form(){

    return (
        <FormContent/>
    )
    
}

function FormContent() {
    const { user, setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("name, value: ", name, value);
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const inputName = {
        type: "text",
        placeholder: "Name",
        valor: user.name,
        name: "name",
        funcion: handleChange
    }
    const inputEmail = {
        type: "text",
        placeholder: "Email",
        valor: user.email,
        name: "email",
        funcion: handleChange
    }
    const inputAge = {
        type: "number",
        placeholder: "Age",
        valor: user.age,
        name: "age",
        funcion: handleChange
    }
    return (
        <form className="myForm">
            <div>
                <MyInput {...inputName} />
            </div>
            <div>
                <MyInput {...inputEmail} />
            </div>
            <div>
                <MyInput {...inputAge} />
            </div>
        </form>
    )
}