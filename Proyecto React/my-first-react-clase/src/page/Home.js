import ValidateLogin from "../utils/ValidateLogin";

export default function Home() {
  ValidateLogin();
  return (
    <div>
        <h1> Home </h1>
    </div>
  );
}