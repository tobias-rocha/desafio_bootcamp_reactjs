import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories',{
      curso: 'Jquery',
      nome: 'Tobias'
    });
    
    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`);

    setProjects(projects.filter(
      project => project.id !== id
    ));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
        <li key={project.id}>
          {project.curso} - {project.nome}
          <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
