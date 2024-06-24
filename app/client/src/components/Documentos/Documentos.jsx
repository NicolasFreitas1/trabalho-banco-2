// src/components/Documentos/Documentos.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DocumentoForm from "./DocumentoForm";
import "./Documentos.css";

const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [editingDocument, setEditingDocument] = useState(null); // Inicializado como null para indicar nenhum documento em edição
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/documents");
      setDocumentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
    }
  };

  const handleSave = () => {
    setEditingDocument(null); // Após salvar, saímos do modo de edição
    fetchDocumentos(); // Atualiza a lista de documentos após salvar
  };

  const handleEdit = (document) => {
    setEditingDocument(document); // Configura o documento para edição
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/documents/${id}`);
      fetchDocumentos(); // Atualiza a lista de documentos após deletar
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
    }
  };

  const handleGerarNovaVersao = (documento) => {
    // Lógica para gerar nova versão do documento
    console.log("Gerar nova versão do documento:", documento);
  };

  const handleEditarDescricao = (documento) => {
    // Lógica para editar a descrição do documento
    console.log("Editar descrição do documento:", documento);
  };

  const handleVisualizarDocumento = (documento) => {
    // Lógica para visualizar o documento
    console.log("Visualizar documento:", documento);
  };

  const handleNovoDocumento = () => {
    setEditingDocument(null); // Configura para criar um novo documento
  };

  return (
    <div className="documentos-container">
      {editingDocument === null ? ( // Verifica se estamos criando um novo documento
        <DocumentoForm onSave={handleSave} />
      ) : (
        <div>
          <button onClick={handleNovoDocumento}>Novo Documento</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Proprietário</th>
                <th>Tipo de Documento</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((documento) => (
                <tr key={documento.id}>
                  <td>{documento.id}</td>
                  <td>{documento.id_proprietario}</td>
                  <td>{documento.id_tipo_documento}</td>
                  <td>{documento.descricao}</td>
                  <td>
                    <button onClick={() => handleGerarNovaVersao(documento)}>
                      Gerar Nova Versão
                    </button>
                    <button onClick={() => handleEditarDescricao(documento)}>
                      Editar Descrição
                    </button>
                    <button
                      onClick={() => handleVisualizarDocumento(documento)}
                    >
                      Visualizar Documento
                    </button>
                    <button onClick={() => handleDelete(documento.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Documentos;
