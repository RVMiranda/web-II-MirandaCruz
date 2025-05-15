import "./../styles/platilloCard.css";

export default function PlatilloCard({ meal }) {
  return (
    <div className="platillo-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>{meal.strMeal}</p>
    </div>
  );
}