import React from 'react';
import '../styles/modal.scss'; // Ensure this path is correct

const Modal = ({ recipe, onClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>×</button>
        <h2>{recipe.label}</h2>
        <div className='modal-body'>
          <img src={recipe.image} alt={recipe.label} />
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Modal;
