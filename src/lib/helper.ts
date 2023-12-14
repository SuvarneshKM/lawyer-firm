// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://my-json-server.typicode.com/SuvarneshKM/lawyer-firm";

export const getAllLawyers = () => fetch(`${BASE_URL}/lawyers`);
