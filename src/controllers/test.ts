import { Request, Response } from "express";
import VendorField from "../models/VendorField";

export const addVendorFields = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { vendorTypeId } = req.body;

    // Validate Vendor Type ID
    if (!vendorTypeId) {
      res.status(400).json({ error: "Vendor Type ID is required" });
      return;
    }

    const fields = [
      {
        fieldName: "mostBookedPackageValue",
        labelName: "What is the value of your most booked package?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "packageDays",
        labelName: "The above package includes services for how many days?",
        fieldType: "radio",
        options: ["1 day", "2 days", "3 days", "4 days"],
        optional: false,
      },
      {
        fieldName: "packageServices",
        labelName: "The above package includes which services?",
        fieldType: "multiple_select",
        options: ["Photo", "Photo + Video", "Photo + Video + Pre wedding"],
        optional: false,
      },
      {
        fieldName: "userCancellationPolicy",
        labelName:
          "Please describe your cancellation policy (if a user initiates cancellation)",
        fieldType: "radio",
        options: [
          "Partial Refund Offered",
          "No Refund Offered",
          "No Refund Offered However Date Adjustment Can Be Done",
          "Full Refund Offered",
        ],
        optional: false,
      },
      {
        fieldName: "vendorCancellationPolicy",
        labelName:
          "Please describe your cancellation policy (if you initiate a cancellation)",
        fieldType: "radio",
        options: [
          "Partial Refund Offered",
          "No Refund Offered",
          "Full Refund Offered",
        ],
        optional: false,
      },
      {
        fieldName: "cancellationTerms",
        labelName:
          "What are the terms & conditions of your cancellation policy?",
        fieldType: "text",
        placeholder: "Enter your message*",
        optional: false,
      },
      {
        fieldName: "photographyStyle",
        labelName: "Describe your photography in three words",
        fieldType: "text",
        placeholder: "Enter your message*",
        optional: false,
      },
      {
        fieldName: "citiesCovered",
        labelName: "How many cities have you covered weddings in till date?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "lovePhotographyBecause",
        labelName: "We love wedding photography because",
        fieldType: "text",
        placeholder: "Enter your message*",
        optional: false,
      },
      {
        fieldName: "bookingAdvanceWeeks",
        labelName: "How many weeks in advance should a booking be made?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "yearStarted",
        labelName: "Which Year you started shooting weddings?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "deliveryWeeks",
        labelName: "How many weeks do you take to deliver the photos?",
        fieldType: "text",
        placeholder: "6 weeks, 7 weeks etc.",
        optional: false,
      },
      {
        fieldName: "servicesOffered",
        labelName: "Which services do you offer?",
        fieldType: "multiple_select",
        options: [
          "Candid Photography",
          "Wedding Films",
          "Traditional Photography",
          "Pre-Wedding Shoots",
          "Albums",
          "Maternity Shoots",
          "Fashion Shoots",
          "Pre wedding Films",
          "Traditional Videography",
          "Drone Photography",
          "Live Streaming",
          "Small Function Photography",
        ],
        optional: false,
      },
      {
        fieldName: "speciality",
        labelName: "What is your speciality?",
        fieldType: "radio",
        options: ["Candid Specialist", "Traditional + Candid Specialist"],
        optional: false,
      },
      {
        fieldName: "smallEventPrice",
        labelName:
          "Price for covering a small event like an engagement or roka",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "processedPhotos",
        labelName:
          "How many processed (edited) pictures are delivered to the client?",
        fieldType: "radio",
        options: ["<300", "300 - 500", "500-700", ">700"],
        optional: false,
      },
      {
        fieldName: "paymentTerms",
        labelName: "What are your payment terms?",
        fieldType: "radio",
        options: [
          "Upto 25% Advance",
          "Approx 50% Advance while booking",
          "100% Advance while booking",
        ],
        optional: false,
      },
      {
        fieldName: "travelLodging",
        labelName:
          "Who bears the cost of travel and lodging when traveling to a different city?",
        fieldType: "radio",
        options: [
          "Cost of Stay borne by Client, Travel borne by Us",
          "Cost of Stay & Travel borne by Client",
        ],
        optional: false,
      },
      {
        fieldName: "weddingPackage1",
        labelName:
          "Candid Photography and Traditional Photography one day package for wedding day",
        fieldType: "number",
        placeholder: "Set as default",
        optional: false,
      },
      {
        fieldName: "weddingPackage2",
        labelName:
          "Candid Photography, Traditional Photography and Cinematic Video one day package",
        fieldType: "number",
        placeholder: "Set as default",
        optional: false,
      },
    ];

    // ✅ Insert Fields into the Database
    const vendorFields = fields.map((field) => ({
      vendorTypeId,
      ...field,
    }));

    await VendorField.insertMany(vendorFields);

    res.status(201).json({
      message: "Vendor fields added successfully!",
      fields: vendorFields,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding vendor fields" });
  }
};

export const addVenueFields = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { vendorTypeId } = req.body;

    // Validate Vendor Type ID
    if (!vendorTypeId) {
      res.status(400).json({ error: "Vendor Type ID is required" });
      return;
    }

    const fields = [
      {
        fieldName: "roomsPerNight",
        labelName:
          "How many rooms are included in your destination Price(per Night)?",
        fieldType: "number",
        placeholder: "Default is 100",
        optional: false,
      },
      {
        fieldName: "venueBio",
        labelName: "What would be the one-line bio for your venue?",
        fieldType: "text",
        placeholder: "Enter your message*",
        optional: false,
      },
      {
        fieldName: "roomBookingRequirement",
        labelName:
          "Do you need a minimum guarantee of room booking for hosting a wedding?",
        fieldType: "radio",
        options: [
          "Yes, set number of rooms should be booked to host a wedding",
          "No, can host a wedding without room booking",
          "Complete buyout of the rooms is mandatory",
        ],
        optional: false,
      },
      {
        fieldName: "bookingAmount",
        labelName:
          "What is the booking amount (in percentage terms you take) to block a date?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "venueUSP",
        labelName: "What is your USP?",
        fieldType: "text",
        placeholder: "Enter your message*",
        optional: false,
      },
      {
        fieldName: "advanceBookingWeeks",
        labelName: "How many weeks in advance should a booking be made?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "userCancellationPolicy",
        labelName:
          "Please describe your cancellation policy (if a user initiates cancellation)",
        fieldType: "radio",
        options: [
          "Partial Refund Offered",
          "No Refund Offered",
          "No Refund Offered However Date Adjustment Can Be Done",
          "Full Refund Offered",
        ],
        optional: false,
      },
      {
        fieldName: "venueCancellationPolicy",
        labelName:
          "Please describe your cancellation policy (if you initiate a cancellation)",
        fieldType: "radio",
        options: [
          "Partial Refund Offered",
          "No Refund Offered",
          "Full Refund Offered",
        ],
        optional: false,
      },
      {
        fieldName: "cancellationTerms",
        labelName:
          "What are the terms & conditions of your cancellation policy?",
        fieldType: "text",
        placeholder: "Enter your message*",
        optional: false,
      },
      {
        fieldName: "rentalWithPlateCost",
        labelName:
          "Does your venue have rental cost along with per plate cost?",
        fieldType: "radio",
        options: ["Yes", "No"],
        optional: false,
      },
      {
        fieldName: "primaryVenueType",
        labelName: "Primary Venue Type",
        fieldType: "select",
        options: [
          "Farmhouse with Indoor Banquet capability",
          "Farmhouse with only outdoor area",
          "Hotel with indoor banquets & lawn",
          "Hotel with indoor banquets",
          "Standalone Banquet hall",
          "Standalone Banquet hall with outdoor area",
          "Resort for destination wedding",
          "Restaurant / Lounge for Pre-wedding events",
          "Fort / Palace venue",
          "Cultural Center / Club with Banquet capability",
          "5 Star Hotel with indoor banquets & lawn",
          "5 Star Hotel with indoor banquets",
        ],
        optional: false,
      },
      {
        fieldName: "vegMenuPrice",
        labelName:
          "What is the starting price for vegetarian menu? (assume 250 pax and standard menu)",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "roomCount",
        labelName: "How many rooms are available in your accommodation?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "cateringPolicy",
        labelName: "What is your policy on catering?",
        fieldType: "radio",
        options: [
          "Inhouse catering, Outside vendors not permitted",
          "Inhouse catering, Outside vendors allowed",
          "No inhouse service, Outside vendors allowed from panel",
          "No inhouse services, outside vendors allowed",
        ],
        optional: false,
      },
      {
        fieldName: "nonVegMenuPrice",
        labelName:
          "What is the starting price for a non-veg menu? (assume 250 pax and standard menu)",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "decorPolicy",
        labelName: "What is your policy on decor?",
        fieldType: "radio",
        options: [
          "Decorators should be chosen only from enlisted Panel",
          "Outside decorators permitted",
          "In-house décor",
        ],
        optional: false,
      },
      {
        fieldName: "venueTypeFilter",
        labelName: "Venue Type filter",
        fieldType: "multiple_select",
        options: ["Indoor", "Outdoor", "Poolside", "Terrace / Rooftop"],
        optional: false,
      },
      {
        fieldName: "smallGatherings",
        labelName: "Do you also allow small size gatherings (<50)?",
        fieldType: "radio",
        options: ["Yes", "No"],
        optional: false,
      },
      {
        fieldName: "basicRoomPrice",
        labelName: "What is the starting price for a basic room at your hotel?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "venueFeatures",
        labelName: "Please select whatever is applicable for your venue",
        fieldType: "multiple_select",
        options: [
          "Venue is Wheelchair friendly",
          "Venue has sufficient parking available",
          "Venue is veg only (does not serve non-veg)",
          "Venue has a beachfront/ beach view",
          "Venue requires complete buyout of all rooms to host a wedding",
          "Venue can host events for <50 people",
          "Venue has a mountain view",
          "Venue has a lake view/ river view",
          "Venue is pet friendly",
          "Venue allows outside decorator",
          "Venue allows outside caterer",
          "Venue allows outside alcohol",
          "Venue has a sea view",
        ],
        optional: false,
      },
      {
        fieldName: "operationYear",
        labelName: "What year did your venue start operations?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "parkingAvailability",
        labelName: "Is parking available at the venue?",
        fieldType: "radio",
        options: [
          "There is sufficient parking available",
          "Parking is available near the venue",
          "No parking available",
        ],
        optional: false,
      },
      {
        fieldName: "alcoholPolicy",
        labelName: "What is your policy on alcohol?",
        fieldType: "radio",
        options: [
          "In house alcohol available, Outside alcohol permitted",
          "In house alcohol available, Outside alcohol not permitted",
          "In house alcohol not available, Outside alcohol permitted",
          "In house alcohol not available, Outside alcohol not permitted",
        ],
        optional: false,
      },
      {
        fieldName: "decorationStartingPrice",
        labelName: "What is the minimum starting price to decorate your venue?",
        fieldType: "number",
        optional: false,
      },
      {
        fieldName: "djPolicy",
        labelName: "What is your policy on DJ's?",
        fieldType: "radio",
        options: [
          "In house DJ available, Outside DJ permitted",
          "In house DJ available, Outside DJ not permitted",
          "In house DJ not available, Outside DJ permitted",
          "In house DJ not available, Outside DJ not permitted",
        ],
        optional: false,
      },
    ];

    // ✅ Insert Fields into the Database
    const venueFields = fields.map((field) => ({
      vendorTypeId,
      ...field,
    }));

    await VendorField.insertMany(venueFields);

    res.status(201).json({
      message: "Venue fields added successfully!",
      fields: venueFields,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding venue fields" });
  }
};
