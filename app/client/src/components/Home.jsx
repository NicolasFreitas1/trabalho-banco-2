// src/components/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2>Página Inicial</h2>
      <div className="section-container">
        <div className="button-container">
          <Link to="/usuarios">
            <button>Lista de Usuários</button>
          </Link>
          <Link to="/documentos">
            <button>Documentos</button>
          </Link>
          <Link to="/pastas">
            <button>Pastas</button>
          </Link>
          <Link to="/permissoes">
            <button>Permissões</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
