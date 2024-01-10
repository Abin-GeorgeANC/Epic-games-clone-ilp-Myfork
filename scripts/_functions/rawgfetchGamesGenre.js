//Make sure to install Axios before using

async function fetchGenre(apiKey) {
  const baseUrl = "https://api.rawg.io/api/genres?key=" + apiKey;

  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export default fetchGenre; // Export the fetchData;

// Example usage
// const apiKey = "c743276cb3944c4ead359796d7c95793";
// const parameterList = [
//   ["platforms", "4"],
//   ["metacritic", "90", "100"],
//   ["ordering", "-released"],
// ];

// fetchData(apiKey, parameterList)
//   .then((data) => {
//     console.log("Fetched data:", data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
