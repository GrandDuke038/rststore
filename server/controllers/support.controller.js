import SupportModel from "#models/support.model.js";
import UserModel from "#models/user.model.js";

const statuses = ["open", "in_progress", "resolved", "closed"];
const categories = [
  "Order Issue",
  "Payment Issue",
  "Delivery Issue",
  "Product Issue",
  "Account Issue",
  "Technical Issue",
  "Other",
];
const priorities = ["low", "medium", "high"];

const getPagination = (query, defaultPageSize = 25) => ({
  pageSize: Math.min(Math.max(Number(query.pageSize) || defaultPageSize, 1), 100),
  page: Math.max(Number(query.pageNumber) || 1, 1),
});

const findTicket = (id) =>
  SupportModel.findById(id)
    .populate("user", "name email")
    .populate("assignedTo", "name email")
    .populate("replies.sender", "name email");

const ensureTicketAccess = (ticket, user) => {
  if (!ticket) {
    return false;
  }

  return user.isAdmin || ticket.user._id.equals(user._id);
};

const createTicket = async (req, res) => {
  const { subject, category, message, priority = "medium" } = req.body;

  if (!subject?.trim() || !message?.trim() || !categories.includes(category)) {
    res.status(400);
    throw new Error("Subject, category, and message are required");
  }

  if (!priorities.includes(priority)) {
    res.status(400);
    throw new Error("Invalid ticket priority");
  }

  const ticket = await SupportModel.create({
    user: req.user._id,
    subject,
    category,
    message,
    priority,
  });

  res.status(201).json(ticket);
};

const getMyTickets = async (req, res) => {
  const { pageSize, page } = getPagination(req.query, 10);
  const filter = { user: req.user._id };

  if (req.query.status && statuses.includes(req.query.status)) {
    filter.status = req.query.status;
  }

  const [tickets, count] = await Promise.all([
    SupportModel.find(filter)
      .select("subject category status priority createdAt updatedAt assignedTo")
      .populate("assignedTo", "name")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    SupportModel.countDocuments(filter),
  ]);

  res.status(200).json({ tickets, page, pages: Math.ceil(count / pageSize) });
};

const getTicketById = async (req, res) => {
  const ticket = await findTicket(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Support ticket not found");
  }

  if (!ensureTicketAccess(ticket, req.user)) {
    res.status(403);
    throw new Error("Not authorized to access this support ticket");
  }

  res.status(200).json(ticket);
};

const addReply = async (req, res) => {
  const { message } = req.body;
  if (!message?.trim()) {
    res.status(400);
    throw new Error("Reply message is required");
  }

  const ticket = await findTicket(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Support ticket not found");
  }

  if (!ensureTicketAccess(ticket, req.user)) {
    res.status(403);
    throw new Error("Not authorized to reply to this support ticket");
  }

  ticket.replies.push({ sender: req.user._id, message });
  await ticket.save();

  const updatedTicket = await findTicket(ticket._id);
  res.status(201).json(updatedTicket);
};

const getTickets = async (req, res) => {
  const { pageSize, page } = getPagination(req.query);
  const filter = {};

  if (statuses.includes(req.query.status)) filter.status = req.query.status;
  if (categories.includes(req.query.category)) filter.category = req.query.category;
  if (priorities.includes(req.query.priority)) filter.priority = req.query.priority;
  if (req.query.search?.trim()) {
    const search = req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { subject: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  const [tickets, count] = await Promise.all([
    SupportModel.find(filter)
      .select("user subject category status priority assignedTo createdAt updatedAt")
      .populate("user", "name email")
      .populate("assignedTo", "name")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    SupportModel.countDocuments(filter),
  ]);

  res.status(200).json({ tickets, page, pages: Math.ceil(count / pageSize) });
};

const updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  if (!statuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid ticket status");
  }

  const ticket = await SupportModel.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Support ticket not found");
  }

  ticket.status = status;
  await ticket.save();
  res.status(200).json(await findTicket(ticket._id));
};

const assignTicket = async (req, res) => {
  const { assignedTo } = req.body;
  const ticket = await SupportModel.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Support ticket not found");
  }

  if (assignedTo) {
    const assignee = await UserModel.findById(assignedTo).select("isAdmin");
    if (!assignee || !assignee.isAdmin) {
      res.status(400);
      throw new Error("Tickets can only be assigned to an admin user");
    }
  }

  ticket.assignedTo = assignedTo || null;
  await ticket.save();
  res.status(200).json(await findTicket(ticket._id));
};

export {
  addReply,
  assignTicket,
  createTicket,
  getMyTickets,
  getTicketById,
  getTickets,
  updateTicketStatus,
};
