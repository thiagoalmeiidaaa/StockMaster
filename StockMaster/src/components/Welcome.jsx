import React, { useState } from 'react';
import './Welcome.css'; // Importe o arquivo de estilo CSS

function Welcome({ onLogout, updateStock }) {
  // Declara o componente Welcome com propriedades onLogout e updateStock
  const [stock, setStock] = useState([
    // Define o estado 'stock' e sua função de atualização com um array inicial de itens
    { id: 1, name: 'Pneu', quantity: 10 }, // Define um item no estoque com id, nome e quantidade
    { id: 2, name: 'Óleo do Motor', quantity: 5 },
    { id: 3, name: 'Filtro de Ar', quantity: 8 },
  ]);

  const [cart, setCart] = useState([]); // Define o estado 'cart' (carrinho) e sua função de atualização com um array vazio inicial
  const [selectedItem, setSelectedItem] = useState(''); // Define o estado 'selectedItem' (item selecionado) e sua função de atualização com uma string vazia inicial
  const [quantity, setQuantity] = useState(1); // Define o estado 'quantity' (quantidade) e sua função de atualização com o valor 1 inicial

  const handleAddToCart = () => {
    // Função para adicionar um item ao carrinho
    const item = stock.find((item) => item.name === selectedItem); // Encontra o item selecionado no estoque
    if (item && item.quantity >= quantity) {
      // Verifica se o item existe no estoque e se há quantidade suficiente
      const newCart = [...cart, { id: item.id, name: item.name, quantity }]; // Cria um novo carrinho com o item adicionado
      setCart(newCart); // Atualiza o estado do carrinho
      const newStock = stock.map((i) => {
        // Cria um novo estoque após retirar os itens do carrinho
        if (i.name === selectedItem) {
          // Verifica se é o item retirado do estoque
          return { ...i, quantity: i.quantity - quantity }; // Atualiza a quantidade do item no estoque
        }
        return i;
      });
      setStock(newStock); // Atualiza o estado do estoque
      setSelectedItem(''); // Reseta o item selecionado
      setQuantity(1); // Reseta a quantidade
      updateStock(newStock); // Chama a função para atualizar o estoque do Admin
    } else {
      alert('Quantidade indisponível para retirada!'); // Alerta se a quantidade for insuficiente no estoque
    }
  };
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h2>Bem-vindo, Cliente!</h2>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <h3>Itens Disponíveis em estoque</h3>
      <ul>
        {stock.map(
          (
            item // Mapeia e exibe os itens disponíveis no estoque
          ) => (
            <li key={item.id}>
              {item.name} - Quantidade: {item.quantity}{' '}
              {/* Exibe o nome e a quantidade do item */}
            </li>
          )
        )}
      </ul>
      <h3>Itens retirados</h3>
      <ul>
        {cart.map((item, index /* Mapeia e exibe os itens retirados */) => (
          <li key={index}>
            {item.name} - Quantidade: {item.quantity}{' '}
            {/* Exibe o nome e a quantidade do item */}
          </li>
        ))}
      </ul>
      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
      >
        <option value="">Selecione um item</option>{' '}
        {/* Opção padrão no seletor de itens */}
        {stock.map(
          (item /* Mapeia e exibe os itens disponíveis no seletor */) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          )
        )}
      </select>
      <input
        type="number"
        value={quantity}
        min={1}
        max={10}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={handleAddToCart}>Retirar do estoque</button>{' '}
      {/* Botão para retirar itens do estoque */}
    </div>
  );
}

export default Welcome;
