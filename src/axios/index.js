import axios from "axios";
// const production = "https://leaguequizes.herokuapp.com/";
const dev = "http://localhost:5000/";
export default axios.create({
  // baseURL: production,
  baseURL: dev,
});
