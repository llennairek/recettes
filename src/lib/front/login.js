import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post("http://localhost:3000/api/user/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(`[${error.response.status}] ${error.response.data}`);
  }
};
