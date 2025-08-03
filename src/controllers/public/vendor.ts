import { Request, Response } from "express";
import { Types } from "mongoose";
import VendorProfile from "../../models/VendorProfile";
import City from "../../models/City";

// Public vendor search controller
export const searchVendors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      query,
      category,
      subcategory,
      city,
      limit = 20,
      page = 1,
    } = req.query;

    // Build search criteria
    const searchCriteria: any = {
      status: "active", // Only show active vendors
    };

    // Text search across multiple fields
    if (query && typeof query === "string") {
      searchCriteria.$or = [
        { brandname: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { "address.city": { $regex: query, $options: "i" } },
        { "address.district": { $regex: query, $options: "i" } },
      ];
    }

    // Category filter
    if (category && Types.ObjectId.isValid(category as string)) {
      searchCriteria.categoryId = category;
    }

    // Subcategory filter
    if (subcategory && Types.ObjectId.isValid(subcategory as string)) {
      searchCriteria.subcategoryId = subcategory;
    }

    // City filter
    if (city && typeof city === "string") {
      searchCriteria.$or = searchCriteria.$or || [];
      searchCriteria.$or.push(
        { city: { $regex: city, $options: "i" } },
        { "address.city": { $regex: city, $options: "i" } }
      );
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const limitNum = Number(limit);

    // Execute search with pagination
    const vendors = await VendorProfile.find(searchCriteria)
      .select(
        "brandname description city address image status badge categoryId subcategoryId"
      )
      .populate("categoryId", "name")
      .populate("subcategoryId", "name")
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const totalVendors = await VendorProfile.countDocuments(searchCriteria);

    res.status(200).json({
      message: "Vendors found successfully",
      data: {
        vendors,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalVendors / limitNum),
          totalVendors,
          limit: limitNum,
        },
      },
    });
  } catch (error) {
    console.error("Error searching vendors:", error);
    res.status(500).json({
      error: "Error searching vendors",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Public city search controller (moved from vendorProfile)
export const searchCities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Query parameter is required" });
      return;
    }

    const cities = await City.find({
      cityname: { $regex: query, $options: "i" },
    })
      .select("cityname state statecode")
      .limit(20)
      .sort({ cityname: 1 });

    res.status(200).json({
      message: "Cities found successfully",
      data: cities,
    });
  } catch (error) {
    console.error("Error searching cities:", error);
    res.status(500).json({
      error: "Error searching cities",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
