import { Request, Response } from "express";
import { HelpdeskTicket } from "../../models/HelpdeskTicket";
import { Types } from "mongoose";

export const getAllHelpdeskTickets = async (req: Request, res: Response) => {
  try {
    const { status, issueType } = req.query;
    const filter: any = {};
    if (status) filter.status = status;
    if (issueType) filter.issueType = issueType;
    const tickets = await HelpdeskTicket.find(filter).populate("vendorId");
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
    const ticket = await HelpdeskTicket.findById(id).populate("vendorId");
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ticket" });
  }
};

export const respondToHelpdeskTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { adminResponse, status } = req.body;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid ticket ID" });
      return;
    }
    const ticket = await HelpdeskTicket.findByIdAndUpdate(
      id,
      { adminResponse, status },
      { new: true }
    ).populate("vendorId");
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }
    res.status(200).json({ message: "Response sent!", ticket });
  } catch (error) {
    res.status(500).json({ error: "Error responding to ticket" });
  }
};
