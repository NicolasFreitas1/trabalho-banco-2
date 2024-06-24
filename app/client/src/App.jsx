// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Usuarios from './components/Usuarios/UsuariosList';
import UsuarioForm from './components/Usuarios/UsuarioForm';
import Documentos from './components/Documentos/Documentos';
import Pastas from './components/Pastas/PastasList';
import Permissoes from './components/Permissoes/PermissoesList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/novo" element={<UsuarioForm />} />
        <Route path="/usuarios/:id" element={<UsuarioForm />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/documentos/novo" element={<Documentos />} />
        <Route path="/documentos/:id" element={<Documentos />} />
        <Route path="/pastas" element={<Pastas />} />
        <Route path="/permissoes" element={<Permissoes />} />
      </Routes>
    </Router>
  );
};

export default App;
