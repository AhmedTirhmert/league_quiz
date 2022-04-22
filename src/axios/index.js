import axios from "axios";
// const production = "https://leaguequizes.herokuapp.com/";
const dev = "http://10.42.0.39:5000/";
export default axios.create({
  // baseURL: production,
  baseURL: dev,
});
