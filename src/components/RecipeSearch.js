import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { fetchData } from "../service";
import Modal from './modal'; // Ensure this path is correct
import '../styles/RecipeSearch.scss';

function RecipeSearch(props) {
  const [searchedTerm, setSearchedTerm] = useState('');
  const [data, setData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const searchRecipe = async (searchQuery) => {
    setLoading(true); // Set loading to true when starting the search
    try {
      const response = await fetchData(searchQuery);
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null); // Optionally handle the error state
    } finally {
      setLoading(false); // Set loading to false when the search completes
      if (props.setLoader) {
        props.setLoader(false);
      }
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='container'>
      <div className='heading-line'>
        <strong>Search Recipes</strong>
        <div className='input-wrapper'>
          <input
            onChange={(e) => setSearchedTerm(e.target.value)}
            value={searchedTerm}
            type="text"
            placeholder='Search your recipe' />
          <button onClick={() => searchRecipe(searchedTerm)}>
            <BsSearch />
          </button>
        </div>
      </div>

      {/* Show loader while searching */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

      {!loading && (
        <div className='flexbox'>
          {data && data.hits.map((item, index) => (
            <div key={index} className='flexItem' onClick={() => handleRecipeClick(item.recipe)}>
              <div className='img-wrapper'>
                <img src={item.recipe.image} alt={item.recipe.label} />
              </div>
              <p>{item.recipe.label}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedRecipe && <Modal recipe={selectedRecipe} onClose={closeModal} />}
    </div>
  );
}

export default RecipeSearch;
