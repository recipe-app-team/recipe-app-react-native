const API_URL = "https://www.themealdb.com/api/json/v1/1";

// Generic helper
const fetchData = async (endpoint, key) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    const data = await response.json();
    return data[key] || [];
  } catch (error) {
    console.log("API error:", error);
    return [];
  }
};

// Search recipes by name
export const getRecipes = (query = "") =>
  fetchData(`search.php?s=${query}`, "meals");

// Get all categories
export const getCategories = () =>
  fetchData("categories.php", "categories");

// Get recipes by category
export const getRecipesByCategory = (category) =>
  fetchData(`filter.php?c=${category}`, "meals");
