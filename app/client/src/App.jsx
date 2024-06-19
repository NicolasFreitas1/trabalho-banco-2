// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UsuariosList from './components/Usuarios/UsuariosList';
import UsuarioForm from './components/Usuarios/UsuarioForm';
import DocumentosList from './components/Documentos/DocumentosList';
import PastasList from './components/Pastas/PastasList';
import PermissoesList from './components/Permissoes/PermissoesList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<UsuariosList />} />
        <Route path="/usuario/:id" element={<UsuarioForm />} />
        <Route path="/documentos" element={<DocumentosList />} />
        <Route path="/pastas" element={<PastasList />} />
        <Route path="/permissoes" element={<PermissoesList />} />
      </Routes>
    </Router>
  );
};

export default App;
