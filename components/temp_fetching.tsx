// const [token, setToken] = useState("");
// const [response, setResponse] = useState([]);

// const fetchUsers = async () => {
//   console.log(`Fetching users`);

//   try {
//     const response = await axios.get("http://localhost:4000/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log(response.data);
//     setResponse(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const fetchCafes = async () => {
//   console.log(`Fetching cafes`);

//   try {
//     const response = await axios.get("http://localhost:4000/cafe", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log(response.data);
//     setResponse(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const fetchReviews = async () => {
//   console.log(`Fetching personal reviews`);

//   try {
//     const response = await axios.get(
//       `http://localhost:4000/review/clz47e7ja00009rgc38zytlp9`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     console.log(response.data);
//     setResponse(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
