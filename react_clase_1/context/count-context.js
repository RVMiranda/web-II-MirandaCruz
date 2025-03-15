/*const { useState, createContext } = React;

const CountContext = createContext(null);

function CountContextProvider({ children}) {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

window.CountContextProvider = CountContextProvider;
window.CountContext = CountContext;
*/
// context/count-context.js
const { createContext } = React;

const CountContext = createContext();

function CountContextProvider({ children, value }) {
    return (
        <CountContext.Provider value={value}>
            {children}
        </CountContext.Provider>
    );
}

// Asignar el contexto y el proveedor al objeto window para que estén disponibles globalmente
window.CountContext = CountContext;
window.CountContextProvider = CountContextProvider;

