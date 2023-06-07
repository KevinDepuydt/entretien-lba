const axios = require("axios");
// const https = require("https");
const express = require("express");
/**
 * Format de la réponse JSON
 * [
 *   {
 *     "nom": "Nom 1",
 *   },
 *   {
 *     "nom": "Nom 2",
 *   }
 * ]
 */
(async function () {
  const app = express();

  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname })
  })

  app.get("/data", async (req, res) => {
    // fetch organismes
    const organismes = await getData3();
    // map organismes to get only their name
    const data = organismes.map(({ nom }) => ({ nom }));
    return res.json(data);
  });

  app.listen(3000, () => console.log(`Server ready and listening on port ${3000}`));
})();

/**
 * Fetch data from API to get organismes
 * - Replace nom with raison_sociale
 * @returns {Promise<*>}
 */
async function getData1() {
  try {
    let { data: organismes } = await axios.get("https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5");

    for (let i = 0; i < organismes.length; i++) {
      organismes[i].nom = organismes[i].raison_sociale;
      delete organismes[i].raison_sociale;
    }

    return organismes;
  } catch (e) {
    return [];
  }
}

async function getData2() {
  try {
    const { data } = await axios.get("https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5");
    console.log('getData2', data);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

const getData3 = async () => {
  try {
    const { data } = await axios.get("https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5")
    console.log('getData3', data);
    return data;
  } catch (e) {
    console.log("getData3 error: ", e.message);
    return [];
  }
};

// const getData3 = (callback) => {
//   https
//     .get("https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5", (resp) => {
//       let data = "";
//
//       resp.on("data", (chunk) => {
//         data += chunk;
//       });
//
//       resp.on("end", () => {
//         return callback(data);
//       });
//     })
//     .on("error", (err) => {
//       console.log("Error: " + err.message);
//     });
// };
