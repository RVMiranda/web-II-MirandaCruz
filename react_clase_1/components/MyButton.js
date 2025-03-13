function MyButton({ titulo, Contador, setContador }) {
  function sumar(){
    setContador(Contador + 1)
  }
  return (
    //<button onClick={onClick}> {titulo} </button>
    <button onClick={sumar}> {titulo} </button>
  );
}

window.MyButton = MyButton;