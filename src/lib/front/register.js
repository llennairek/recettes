import axios from "axios";

export const register = async ({ name, email, password }) => {
  try {
    const res = await axios.post("http://localhost:3000/api/user/signup", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(`[${error.response.status}] ${error.response.data}`);
  }
};
