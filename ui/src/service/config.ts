const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:1000/api';



export default BASE_URL;
