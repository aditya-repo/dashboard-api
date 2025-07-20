# WeddinPlanner API

## Overview

This is an advanced, modular API backend for a wedding planner platform. It supports two main dashboard panels:

- **Admin Panel:** Full control over the platform (manage categories, vendors, etc.)
- **Vendor Panel:** Vendor signup and self-management

## Project Structure

```
src/
  controllers/
    admin/
      vendorCategory.controller.ts   # Admin logic for vendor categories
    vendor/
      ...                           # (future) Vendor-specific controllers
  routes/
    admin/
      vendorCategory.routes.ts      # Admin routes for vendor categories
    vendor/
      ...                          # (future) Vendor-specific routes
  services/
    vendorCategory.service.ts       # Business logic for vendor categories
  middlewares/
    auth.ts                        # Admin authentication middleware
    errorHandler.ts                # Centralized error handling
  models/
    VendorCategory.ts              # Mongoose model for vendor categories
    ...
  config/
    db.ts                          # Database connection
  server.ts                        # Entry point
```

## Key Features

- **Separation of Concerns:** Controllers, services, and routes are modular and organized by panel (admin/vendor).
- **Service Layer:** Business logic is encapsulated in services for reusability and testability.
- **Middleware:** Centralized error handling and authentication middleware for clean code.
- **Scalable:** Structure is ready for more features, tools, and panels.

## Example: Vendor Category Management (Admin)

- **Create Category:** `POST /api/admin/vendor-categories/create`
- **Get All Categories:** `GET /api/admin/vendor-categories/all`

## Extending the API

- Add new controllers/services/routes under the appropriate `admin/` or `vendor/` subfolders.
- Use the service layer for business logic.
- Protect admin/vendor routes with appropriate middleware.

## Setup

1. Install dependencies: `npm install`
2. Configure your database in `src/config/db.ts`
3. Start the server: `npm run dev` or `npm start`

## Blog Management (Admin)

The admin panel provides a full-featured Blog Management API, including SEO meta fields and article image support.

### Two-Step Blog Creation

To support multi-step forms, blog creation can be done in two steps:

#### Step 1: Create Blog Meta

- `POST /api/admin/blogs/create-meta`
- Request body: `{ title, author, publishDate, metaTitle, metaDescription, metaKeywords, slug, image, status }`
- Response: Created blog object (with `_id`)

#### Step 2: Add/Update Blog Content

- `PUT /api/admin/blogs/:id/content`
- Request body: `{ content }`
- Response: Updated blog object

You can still use the legacy single-step creation (`POST /api/admin/blogs/create`) if you prefer.

### Blog Model Fields

- `title`: Blog article title
- `content`: Main article body
- `author`: Author name
- `publishDate`: Date of publication
- `metaTitle`: SEO meta title
- `metaDescription`: SEO meta description
- `metaKeywords`: Array of SEO keywords
- `slug`: URL-friendly identifier (unique)
- `image`: Article image URL or file path
- `status`: `draft` or `published`

### Endpoints

- `POST   /api/admin/blogs/create-meta` — Step 1: Create blog meta
- `PUT    /api/admin/blogs/:id/content` — Step 2: Add/update blog content
- `POST   /api/admin/blogs/create` — (Legacy) Create a new blog article
- `GET    /api/admin/blogs/all` — Get all blog articles
- `GET    /api/admin/blogs/:id` — Get a single blog article by ID
- `PUT    /api/admin/blogs/:id` — Update a blog article
- `DELETE /api/admin/blogs/:id` — Delete a blog article

### How the Blog API Works

- **Routes**: Receive HTTP requests and map to controller functions.
- **Controllers**: Validate input, handle request/response, and call service methods.
- **Services**: Contain business logic and interact with the Blog model (MongoDB).
- **Model**: Defines the schema for blogs, including all SEO and image fields.
- **Middlewares**: (e.g., `auth.ts`) can be used to protect admin blog routes.

This modular approach ensures the API is easy to extend, maintain, and secure.

## Vendor Management (Admin)

The admin panel provides full CRUD management for vendors.

### Endpoints

- `POST   /api/admin/vendors/create` — Create a new vendor
- `GET    /api/admin/vendors/all` — Get all vendors
- `GET    /api/admin/vendors/:id` — Get a single vendor by ID
- `PUT    /api/admin/vendors/:id` — Update a vendor
- `DELETE /api/admin/vendors/:id` — Delete a vendor

### How the Vendor API Works

- **Routes**: Receive HTTP requests and map to controller functions.
- **Controllers**: Validate input, handle request/response, and call service methods.
- **Services**: Contain business logic and interact with the Vendor model (MongoDB).
- **Model**: Defines the schema for vendors, including references to user and vendor type.
- **Middlewares**: (e.g., `auth.ts`) can be used to protect admin vendor routes.

This modular approach ensures the API is easy to extend, maintain, and secure.

## Vendor Panel: Onboarding & Management

The vendor panel supports a two-step onboarding process:

### Step 1: Vendor Signup

- `POST /api/vendor/signup`
- Registers a new vendor (creates user and vendor records)
- Request: `{ name, email, password, businessName, vendorTypeId, phone, location }`
- Response: `{ message, vendorId }`

### Step 2: Complete Profile (Dynamic Form)

- `GET /api/vendor/form-fields?vendorId=...`
- Returns dynamic form fields for the vendor's category/type
- `POST /api/vendor/details`
- Vendor submits additional info: `{ vendorId, fieldValues: [{ fieldId, value }, ...] }`

### How It Works

- **Signup:** Vendor provides basic info and is registered in the system.
- **Dynamic Form:** After signup/login, vendor fetches their category's form fields and submits additional details.
- **Validation:** All endpoints use strong validation for data integrity.

This flow ensures a smooth, dynamic onboarding for vendors, tailored to their category.

## Helpdesk (Vendor & Admin Communication)

A support ticket system for communication between vendors and the admin panel.

### Vendor Panel

- `POST /api/vendor/helpdesk` — Create a new ticket (with optional images)
- `GET /api/vendor/helpdesk` — List own tickets
- `GET /api/vendor/helpdesk/:id` — View a specific ticket

### Admin Panel

- `GET /api/admin/helpdesk` — List all tickets (with filters)
- `GET /api/admin/helpdesk/:id` — View a specific ticket
- `PUT /api/admin/helpdesk/:id/respond` — Respond/update status

### Ticket Fields

- `vendorId`, `issueType`, `subject`, `body`, `images` (array, optional), `status`, `adminResponse`, timestamps

### Image Upload

- Vendors can upload up to 5 images per ticket (optional)
- Images are stored in `/uploads/helpdesk/` and accessible via `/uploads/helpdesk/<filename>`

This system enables efficient, managed communication and support between vendors and the admin team.

---

For more details, see the code comments and structure above.
