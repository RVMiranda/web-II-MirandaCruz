import { useState, useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PlatilloCard from './components/platilloCard';


function App() {
  
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Error al obtener categorías", err));
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
        .then((res) => res.json())
        .then((data) => setMeals(data.meals))
        .catch((err) => console.error("Error al obtener platillos", err));
    } else {
      setMeals([]);
    }
  }, [activeCategory]);


  return (
    <>
      <div className="app">
        <header className="app-header">
          <div className="header-image"></div>
        </header>

          <main className="main-section">
            <aside className="category-sidebar">
              <h2>Categories</h2>
              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat.idCategory}
                    className={activeCategory === cat.strCategory ? "active" : ""}
                    onClick={() => setActiveCategory(cat.strCategory)}
                  >
                    <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                    <span>{cat.strCategory}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <section className="recipes-section">              
              <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search recipes and more..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {meals.length > 0 ? (
                <div className="grid-recetas">
                  {meals
                    .filter((meal) =>
                      meal.strMeal.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((meal) => (
                      <PlatilloCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
                ) : (
                <p>Selecciona una categoría para ver recetas.</p>
              )}
            </section>
        </main>
      </div>
    </>
  )
}

export default App
