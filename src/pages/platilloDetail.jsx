import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../styles/platilloDetail.css";

export default function PlatilloDetail() {
  const { id } = useParams();
  const [platillo, setPlatillo] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
        setPlatillo(meal);

        const lista = [];
        for (let i = 1; i <= 20; i++) {
          const ingrediente = meal[`strIngredient${i}`];
          const medida = meal[`strMeasure${i}`];
          if (ingrediente && ingrediente.trim() !== "") {
            lista.push(`${ingrediente} - ${medida}`);
          }
        }
        setIngredientes(lista);
      });
  }, [id]);

  const eliminarIngrediente = (index) => {
    const nuevaLista = [...ingredientes];
    nuevaLista.splice(index, 1);
    setIngredientes(nuevaLista);
  };

  if (!platillo) return <p className="detalle-loading">Cargando platillo...</p>;

  return (
    <div className="detalle-container">
      <h1>{platillo.strMeal}</h1>
      <p><strong>ID:</strong> {platillo.idMeal}</p>
      <p><strong>Categoría:</strong> {platillo.strCategory}</p>
      <p><strong>Instrucciones:</strong></p>
      <p className="detalle-instrucciones">{platillo.strInstructions}</p>

      <div className="detalle-links">
        {platillo.strYoutube && (
          <a href={platillo.strYoutube} target="_blank" rel="noreferrer">Ver en YouTube</a>
        )}
        {platillo.strSource && (
          <a href={platillo.strSource} target="_blank" rel="noreferrer">Sitio Web</a>
        )}
      </div>

      <h2>Ingredientes</h2>
      <ul className="detalle-ingredientes">
        {ingredientes.map((ing, index) => (
          <li key={index}>
            {ing}
            <button onClick={() => eliminarIngrediente(index)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
