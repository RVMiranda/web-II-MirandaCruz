import { useState, useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function App() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Error al obtener categorías", err));
  }, []);

  return (
    <>
      <div className="app">
        {/* Header con imagen */}
        <header className="app-header">
          <img src="/images/header.png" alt="Header" />
        </header>

        {/* Sección de contenido */}
          <main className="main-section">
          {/* CATEGORÍAS */}
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

            {/* SECCIÓN DE RECETAS */}
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

              <p>Selecciona una categoría para ver recetas.</p>
            </section>
        </main>
      </div>
    </>
  )
}

export default App
