import axios from 'axios'
const baseUrl = 'https://fso-cicd-nkcq.onrender.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const eliminar = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request
      .then(response => response.data || {})
      .catch(error => {
        console.error('Error deleting person:', error);
        return {}; 
      });
  };
  
  export default { getAll, create, update, eliminar }