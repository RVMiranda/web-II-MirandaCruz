export default function ValidateLogin(){
    const hasToken = localStorage.getItem("token") !== null;
    if (!hasToken) {
        window.location.href = "/login";
        return;
    }
    return;
}