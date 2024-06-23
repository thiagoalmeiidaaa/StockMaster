import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importe o arquivo de estilo CSS

// Define os estados para o nome de usuário e senha
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Obtém a função navigate para redirecionamento de rotas
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário de login
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Verifica se o nome de usuário e senha correspondem a Admin
    if (username === 'Admin' && password === 'admin123') {
      onLogin(username); // Chama a função onLogin passando o nome de usuário
      navigate('/admin'); // Redireciona para a rota '/admin'
    }
    // Verifica se o nome de usuário e senha correspondem a Cliente
    else if (username === 'Cliente' && password === 'cliente123') {
      onLogin(username); // Chama a função onLogin passando o nome de usuário
      navigate('/welcome'); // Redireciona para a rota '/welcome'
    } else {
      alert('Usuário ou senha incorretos!'); // Exibe um alerta se as credenciais estiverem incorretas
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
