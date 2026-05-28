import userService from "../services/userService.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deactivateUser = async (req, res, next) => {
  try {
    const userDeactivate = await userService.deactivateUser(req.params.id);
    res.json(userDeactivate);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Usuário logado encontrado",
      data: req.user,
    })
  } catch (error) {
    next(error);
  }
}

const updateMe = async (req, res, next) => {
  try {
    const user = await userService.updateMe(req.user._id, req.body)

    res.status(200).json({
      message: "Perfil atualizado com sucesso",
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  getMe,
  updateMe
};