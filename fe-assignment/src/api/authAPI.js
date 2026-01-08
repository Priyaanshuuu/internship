import axios from "axios";
export const fetchUsers = async () => {
  const response = await axios.get(
    "https:
  );
  return response.data;
};
