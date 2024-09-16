const queryStrings = {
    app_id: process.env.REACT_APP_APP_ID,
    app_key:process.env.REACT_APP_APP_KEY,
    nutri_id:process.env.REACT_APP_NUTRITION_API_ID,
    nutri_key:process.env.REACT_APP_NUTRITION_API_KEY
}

// https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=ea8a35b4&app_key=56b09823e04045b663443621d9014218

//https://api.edamam.com/api/nutrition-data?app_id=361742a2&app_key=ad54356419621387cd0511ac8a7654ac&nutrition-type=cooking&ingr=sugar

export const fetchData = async (defaultQuery) => {
    const {app_id,app_key} = queryStrings;
    try {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=${app_id}&app_key=${app_key}`);
        const response = await data.json();
        return response;
    }
    catch(e) {
        console.log(e,'something went wrong')
        return e
    }
}

export const fetchTabData = async (defaultQuery) => {
    const {app_id,app_key} = queryStrings;
    try {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2/${defaultQuery}?type=public&app_id=${app_id}&app_key=${app_key}`);
        const response = await data.json();
        return response;
    }
    catch(e) {
        console.log(e,'something went wrong')
        return e
    }
}

export const fetchNutritionData = async (defaultQuery) => {
    const { nutri_id, nutri_key } = queryStrings;
    try {
      const data = await fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=${nutri_id}&app_key=${nutri_key}&nutrition-type=${defaultQuery}`
      );
      const response = await data.json();
      return response;
    } catch (e) {
      console.log(e, 'something went wrong');
      return e;
    }
  };
  