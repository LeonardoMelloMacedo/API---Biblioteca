import User from "../models/User.js";

const getAllUsers = async () => {
  return User.find();
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const deactivateUser = async (id) => {
  const userDeactivate = await User.findById(id)

  if (!userDeactivate) {
    const error = new Error("não foi possivel encontrar usúario!");
    error.statusCode = 404;
    throw error;
  }

  userDeactivate.ativo = false
  await userDeactivate.save();

  return userDeactivate;

};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
};