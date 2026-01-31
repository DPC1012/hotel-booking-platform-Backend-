import express from "express";
import {
  RequiredLoginBody,
  RequiredSignupBody,
} from "../validation/AuthSchema";
import { prisma } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const AuthRouter = express.Router();
const { sign } = jwt;
AuthRouter.post("/signup", async (req, res) => {
  try {
    const { data, success } = await RequiredSignupBody.safeParseAsync(req.body);
    if (!success) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "INVALID_REQUEST",
      });
    }
    const HashedPassword = await bcrypt.hash(data.password, 10);
    const Response = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: HashedPassword,
        role: data.role,
        phone: data.phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
      },
    });
    return res.status(201).json({
      success,
      data: { ...Response },
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "EMAIL_ALREADY_EXISTS",
    });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { data, success } = RequiredLoginBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "INVALID_REQUEST",
    });
  }
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
    },
  });
  if (!user) {
    return res.status(401).json({
      success: false,
      data: null,
      error: "INVALID_CREDENTIALS",
    });
  }
  const checkPassword = await bcrypt.compare(data.password, user.password);
  if (!checkPassword) {
    return res.status(401).json({
      success: false,
      data: null,
      error: "INVALID_CREDENTIALS",
    });
  }
  const token = sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "",
  );
  res.status(200).json({
    success: true,
    data: {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    error: null,
  });
});

export default AuthRouter;
