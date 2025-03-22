import logo from './logo.svg';
import './App.css';
import MyFirstComponent from "./components/MyFirstComponent";
import Form from "./components/Form/Form";
import Profile from "./components/Form/Profile";  
import { UserContextProvider } from "./context/user-context";
import { Link } from "react-router-dom";
import MyRouters from "./router/Router";
import Menu from './page/base/Menu';

function App() {
  return (
    <Menu/>
  );
}
export default App;
