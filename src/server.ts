import express, { Request, Response } from "express";
import connectDB from "./config/db";
import adminVendorCategoryRoutes from "./routes/admin/vendorCategory";
import { errorHandler } from "./middlewares/errorHandler";
import adminBlogRoutes from "./routes/admin/blog";
import adminVendorRoutes from "./routes/admin/vendor";
import vendorPanelRoutes from "./routes/vendor/vendor";
import vendorHelpdeskRoutes from "./routes/vendor/helpdesk";
import adminHelpdeskRoutes from "./routes/admin/helpdesk";
import adminManagerRoutes from "./routes/admin/manager";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3030;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Admin routes
app.use("/api/admin/category", adminVendorCategoryRoutes);
app.use("/api/admin/blogs", adminBlogRoutes);
app.use("/api/admin/vendors", adminVendorRoutes);
app.use("/api/admin/managers", adminManagerRoutes);

// Vendor panel routes
app.use("/api/vendor", vendorPanelRoutes);

// Vendor helpdesk routes
app.use("/api/vendor/helpdesk", vendorHelpdeskRoutes);

// Admin helpdesk routes
app.use("/api/admin/helpdesk", adminHelpdeskRoutes);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Error handler
app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
