import type { Request, Response } from "express";
import { User } from "../models/User.js";

//GET USERS
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send("ID de usuario inválido");
  }
};

//POST USER
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      message: "Usuario creado exitosamente",
      usuario: newUser,
    });
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
};

//PUT USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(400).send("ID de usuario inválido");
  }
};

//DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(400).send("ID de usuario inválido");
  }
};
