import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../styles/NutritionInfo.scss';

function NutritionInfo() {
  const [title, setTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const chartRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    const createPieChart = (data) => {
      const ctx = document.getElementById('nutrient-chart').getContext('2d');

      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart and store the instance in the ref
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Calories (kcal)', 'Fat (g)', 'Carbs (g)', 'Fiber (g)', 'Protein (g)', 'Calcium (mg)'],
          datasets: [{
            label: 'Nutrient Information',
            data: [
              data.calories,
              data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity.toFixed(2) : 0,
              data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity.toFixed(2) : 0,
              data.totalNutrients.FIBTG ? data.totalNutrients.FIBTG.quantity.toFixed(2) : 0,
              data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity.toFixed(2) : 0,
              data.totalNutrients.CA ? data.totalNutrients.CA.quantity.toFixed(2) : 0,
            ],
            backgroundColor: [
              '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ffcc99'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          aspectRatio: 1.5,
          plugins: {
            title: {
              display: true,
              text: 'Nutrient Information',
              font: {
                size: 18
              }
            }
          }
        }
      });
    };

    if (nutritionData) {
      createPieChart(nutritionData);
    }
  }, [nutritionData]);

  const fetchRecipe = async () => {
    const appId = '361742a2';
    const apiKey = 'ad54356419621387cd0511ac8a7654ac';
    const ingr = recipe.split('\n');
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${apiKey}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, ingr })
      });
      const data = await response.json();
      setNutritionData(data);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipe();
  };

  return (
    <div className="nutrition-info">
      <div className="container mt-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipe" className="form-label">Recipe</label>
            <textarea 
              className="form-control" 
              id="recipe" 
              name="recipe" 
              rows="3" 
              value={recipe} 
              onChange={(e) => setRecipe(e.target.value)} 
            />
          </div>
          <button className="btn btn-primary submit-button">Submit Recipe</button>
        </form>
        <div className="row mt-4">
          <div className="col-md-12">
            <canvas id="nutrient-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionInfo;
