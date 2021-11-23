import axios from "axios";

export const getIngredients = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/ingredients");
    return res.data;
  } catch (error) {
    console.error(`[${error.response.status}] ${error.response.data}`);
  }
};
