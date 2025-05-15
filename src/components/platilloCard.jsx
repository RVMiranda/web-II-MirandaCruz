import "./../styles/platilloCard.css";
import { useNavigate } from "react-router-dom";


export default function PlatilloCard({ meal }) {
    const navigate = useNavigate();
    return (
        <div className="platillo-card" onClick={() => navigate(`/platillo/${meal.idMeal}`)}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strMeal}</p>
        </div>
    );
}