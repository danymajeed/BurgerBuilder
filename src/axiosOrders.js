import axios from "axios";

const instance = axios.create({
  baseURL: "https://buildtheburger.firebaseio.com/",
});

export default instance;
