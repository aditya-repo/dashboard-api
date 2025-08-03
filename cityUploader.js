// importCityData.js

const { MongoClient } = require("mongodb");

// ✅ Replace with your MongoDB Atlas connection string
const uri =
  "mongodb+srv://photographercompany:3eEt0bPecoQPxD8w@studiohub.rr4qx.mongodb.net/?retryWrites=true&w=majority&appName=studiohub";
const dbName = "test";
const collectionName = "cities";

// Raw Excel-like data (tab-separated)
const excelData = `C1181	Bakultala
C1182	Bambooflat
C1183	Car Nicobar
C1184	Garacharma
C1185	Hut Bay
C1186	Kamorta
C1187	Malacca
C1188	Mayabunder
C1189	Port Blair
C1190	Prothrapur
C1191	Rangat
C1192	Tarasa Island
`;
// Helper to format city names
function formatCityName(name) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

// Parse and format Excel data
function parseExcelData(data) {
  const lines = data.trim().split("\n");
  return lines.map((line) => {
    const [cityid, cityname] = line.trim().split("\t");
    return {
      cityid: cityid.trim(),
      cityname: formatCityName(cityname),
      state: "bihar",
      statecode: "S01",
    };
  });
}

// Upload to MongoDB Atlas
async function uploadToMongo(data) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (err) {
    console.error("❌ Error uploading data:", err);
  } finally {
    await client.close();
  }
}

// Main execution
async function main() {
  const cityData = parseExcelData(excelData);
  console.log("✅ Parsed Data:", cityData);

  await uploadToMongo(cityData);
}

main();
