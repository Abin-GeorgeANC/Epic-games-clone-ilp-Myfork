// Import necessary modules and libraries
import { API_KEY, firebaseConfig } from "../../environment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getTransactionList } from "../_functions/transaction_function.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
let dbref = null;
// const userId = localStorage.getItem("userId");
// console.log("User ID:", userId);

// Function to generate the table
async function generateTransactionTable() {
  try {
    // Fetch data from Firestore
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "Userdata", userId);
    dbref = doc(database, "Userdata", userId);
    const docSnapshot = await getDoc(dbref);
    let transactionData = [];

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      transactionData = [...userData.Transactions];
    }

    console.log(transactionData);

    // Table heading
    let tableHTML = '<table class="table" border="1"><tr>';
    tableHTML += `<th scope="col">Transaction date</th>`;
    tableHTML += `<th scope="col">Game Title</th>`;
    tableHTML += `<th scope="col">Game ID</th>`;
    tableHTML += `<th scope="col">Price</th>`;
    tableHTML += "</tr>";

    // Table data
    transactionData.forEach((row) => {
      tableHTML += "<tr>";
      tableHTML += `<td scope="row">${row["date"]}</td>`;
      tableHTML += `<td class="table-game-title" scope="row">${row["name"]}</td>`;
      tableHTML += `<td scope="row">${row["slug"]}</td>`;
      tableHTML += `<td scope="row">${row["retailPrice"]}</td>`;
      tableHTML += "</tr>";
    });
    tableHTML += "</table>";
    document.getElementById("transactionTableContainer").innerHTML = tableHTML;
  } catch (error) {
    console.error("Error fetching transaction data:", error);
  }
}
// Function to fetch data from Firestore
async function fetchTransactionData() {
  try {
    const userId = localStorage.getItem("userId");
    dbref = doc(database, "Userdata", userId);
    const docSnapshot = await getDoc(dbref);
    let tempTransactionArray = [];

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      tempTransactionArray = [...userData.Transactions];
    }
    return tempTransactionArray;
  } catch (error) {
    console.log(`no transactions found`);
  }
}

// // Function to add a game to the transaction list
// async function addGameToTransactionList(gameSlug) {
//   try {
//     // dbref = doc(database, "Userdata", localStorage.getItem("userId"));
//     const gameData = await fetchGameData(gameSlug);
//     let game = {
//       id: gameData.id,
//       title: gameData.name,
//       slug: gameData.slug,
//       actualPrice: prices.salePrice,
//     };

//     await updateTransactionInFirebase(game);
//     generateTransactionTable(); // Regenerate the table after adding the game
//   } catch (error) {
//     console.error("Error adding game to transaction list:", error);
//   }
// }

// // Function to fetch game data from the Rawg API
// async function fetchGameData(gameSlug) {
//   // Replace this placeholder with your actual Rawg API key
//   const baseUrl =
//     "https://api.rawg.io/api/games/" + gameSlug + "?key=" + API_KEY;
//   const response = await axios.get(baseUrl);
//   return response.data;
// }

// Function to update transaction in Firebase

// Call the function to generate the initial table
generateTransactionTable();
