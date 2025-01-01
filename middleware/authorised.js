import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not admin to perform this action' });
    }
    next();
  };
export const isSelf = (req, res, next) => {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'You are not owner of this profile' });
    }
    next();
  };


export const isManager = async (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "You are not manager to perform this action" });
  }
  next();
};

export const isManagerOfTeam = async (req, res, next) => {
  const { id } = req.params
  if (!req.user.team.includes(id)) {
    return res.status(403).json({ message: "this id not in your team" });
  }
  next();
};