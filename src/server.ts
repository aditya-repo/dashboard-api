import express, { Request, Response } from "express";
import vendorRoutes from "./routes/vendorRoutes";
import vendorCategoryRoutes from "./routes/vendorCategoryRoutes";
import connectDB from "./config/db";

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/vendors", vendorRoutes);
app.use("/api/vendor-category", vendorCategoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
