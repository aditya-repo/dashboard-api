import { Request, Response } from "express";
import { HelpdeskTicket } from "../../models/HelpdeskTicket";
import { Types } from "mongoose";

export const createHelpdeskTicket = async (req: Request, res: Response) => {
  try {
    const { vendorId, issueType, subject, body } = req.body;
    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ error: "Invalid vendor ID" });
      return;
    }
    const images = req.files
      ? (req.files as Express.Multer.File[]).map((f) => f.path)
      : [];
    const ticket = await HelpdeskTicket.create({
      vendorId,
      issueType,
      subject,
      body,
      images,
    });
    res.status(201).json({ message: "Ticket created successfully!", ticket });
  } catch (error) {
    res.status(500).json({ error: "Error creating ticket" });
  }
};

export const getOwnHelpdeskTickets = async (req: Request, res: Response) => {
  try {
    const vendorId = req.query.vendorId as string;
    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ error: "Invalid vendor ID" });
      return;
    }
    const tickets = await HelpdeskTicket.find({ vendorId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tickets" });
  }
};

export const getHelpdeskTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid ticket ID" });
      return;
    }
    const ticket = await HelpdeskTicket.findById(id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ticket" });
  }
};
