import { Request, Response } from "express";
import Client from "../../models/Manager";

// Create Manager
export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, name, username, email, password, status, permissions } =
      req.body;
    if (!userId || !name || !username || !email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    // Normalize permissions: if not present, set to 'none'
    const allSections = [
      "user",
      "category",
      "blog",
      "eInvites",
      "article",
      "helpdesk",
    ];
    const normalizedPermissions: any = {};
    allSections.forEach((section) => {
      normalizedPermissions[section] =
        permissions && permissions[section] ? permissions[section] : "none";
    });
    const existing = await Client.findOne({
      $or: [{ userId }, { username }, { email }],
    });
    if (existing) {
      res.status(400).json({
        error: "User with this ID, username, or email already exists",
      });
      return;
    }
    const newManager = new Client({
      userId,
      name,
      username,
      email,
      password, // In production, hash the password!
      status,
      permissions: normalizedPermissions,
    });
    await newManager.save();
    res
      .status(201)
      .json({ message: "Manager created successfully!", user: newManager });
  } catch (error) {
    res.status(500).json({ error: "Error creating manager" });
  }
};

// Get all managers
export const getManagers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const managers = await Client.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching managers" });
  }
};

// Update Manager
export const updateManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const update = req.body;
    // Normalize permissions: if not present, set to 'none'
    const allSections = [
      "user",
      "category",
      "blog",
      "eInvites",
      "article",
      "helpdesk",
    ];
    if (update.permissions) {
      const normalizedPermissions: any = {};
      allSections.forEach((section) => {
        normalizedPermissions[section] = update.permissions[section]
          ? update.permissions[section]
          : "none";
      });
      update.permissions = normalizedPermissions;
    }
    const updatedManager = await Client.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!updatedManager) {
      res.status(404).json({ error: "Manager not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Manager updated successfully!", user: updatedManager });
  } catch (error) {
    res.status(500).json({ error: "Error updating manager" });
  }
};
