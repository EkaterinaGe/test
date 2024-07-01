import React from 'react';
import { CompanyTable } from './features/CompanyTable';
import "./App.css"

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Список компаний</h1>
      <CompanyTable />
    </div>
  );
};

export default App;
