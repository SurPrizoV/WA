import { useState } from 'react';
import './App.css';
import { AppRoutes } from './components/AppRoutes/AppRoutes';

function App() {
  const token = localStorage.getItem("token");
  const[id, setId] = useState('');
  const[apiToken, setApiToken] = useState('');

  return (
    <div className="App">
      <AppRoutes user={token} id={id} setId={setId} apiToken={apiToken} setApiToken={setApiToken}/>
    </div>
  );
}

export default App;
