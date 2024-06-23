import React, { useState } from 'react';
import './Admin.css'; // Importe o arquivo de estilo CSS

function Admin({ onLogout }) {
  // Define o componente Admin com a propriedade onLogout
  const [stock, setStock] = useState([
    // Define o estado 'stock' e sua função de atualização com um array inicial de itens
    { id: 1, name: 'Pneu', quantity: 10 }, // Define um item no estoque com id, nome e quantidade
    { id: 2, name: 'Óleo do Motor', quantity: 5 }, // Define outro item no estoque com id, nome e quantidade
    { id: 3, name: 'Filtro de Ar', quantity: 8 }, // Define outro item no estoque com id, nome e quantidade
  ]);

  const handleAddItem = (newItem) => {
    // Função para adicionar um novo item ao estoque
    setStock([...stock, newItem]); // Adiciona o novo item ao estado do estoque
  };

  const handleRemoveItem = (itemId) => {
    // Função para remover um item do estoque
    setStock(stock.filter((item) => item.id !== itemId)); // Filtra os itens do estoque, removendo o item com o ID fornecido
  };

  return (
    <div className="admin-container">
      <div className="header">
        <h2>Painel de Controle - Admin</h2>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="stock-list">
        <h3>Estoque de Peças de Carro</h3>
        <ul>
          {stock.map((item) => (
            <li key={item.id}>
              {item.name} - Quantidade: {item.quantity}
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AddItemForm onAddItem={handleAddItem} />
    </div>
  );
}

function AddItemForm({ onAddItem }) {
  // Define o componente AddItemForm com a propriedade onAddItem
  const [name, setName] = useState(''); // Define o estado 'name' para armazenar o nome do item
  const [quantity, setQuantity] = useState(''); // Define o estado 'quantity' para armazenar a quantidade do item

  const handleSubmit = (e) => {
    // Função para lidar com o envio do formulário
    e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
    const newItem = {
      // Cria um novo item com o nome e a quantidade fornecidos
      id: Date.now(), // ID baseado no tempo atual
      name,
      quantity: parseInt(quantity), // Converte a quantidade para um número inteiro
    };
    onAddItem(newItem); // Chama a função de adicionar item, passando o novo item como argumento
    setName(''); // Reseta o estado 'name'
    setQuantity(''); // Reseta o estado 'quantity'
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do Item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Adicionar Item</button>
    </form>
  );
}

export default Admin;
