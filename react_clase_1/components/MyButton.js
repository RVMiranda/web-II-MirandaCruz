function MyButton({ titulo, Contador, setContador }) {
  function sumar(){
    setContador(Contador + 1)
  }
  return (
    //<button onClick={onClick}> {titulo} </button>
    <button onClick={sumar}> {titulo} </button>
  );
}

function AlumnoInfo({ alumnos }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "ocultar los datos" : "mostrar los datos"}
      </button>
      {visible && (
        <div className="container">
          {alumnos.map((alumno, index) => (
            <div key={index} className="alumno">
              <p>Nombre: {alumno.nombre}</p>
              <p>Calificación: {alumno.calificacion}</p>
              <p>Materia: {alumno.materia}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

window.MyButton = MyButton;
window.AlumnoInfo = AlumnoInfo;