import loanService from "../services/loanService.js";

const createLoan = async (req, res, next) => {
  try {
    const loan = await loanService.createLoan(req.body);
    res.status(201).json(loan);
  } catch (error) {
    next(error);
  }
};

const getAllLoans = async (req, res, next) => {
  try {
    const loans = await loanService.getAllLoans();
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const getLoanById = async (req, res, next) => {
  try {
    const loan = await loanService.getLoanById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Empréstimo não encontrado" });
    }

    res.json(loan);
  } catch (error) {
    next(error);
  }
};

const getLoansByUser = async (req, res, next) => {
  try {
    const loans = await loanService.getLoansByUser(req.params.userId);
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const getLoanByActive = async (req, res, next) => {
  try {
    const loans = await loanService.getLoanByActive(req.params.ativo);
    res.json(loans);
  } catch (error) {
    next(error);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const loans = await loanService.returnBook(req.params.id);
    res.json(loans);
  } catch (error) {
    next(error);
  }
}

const listOverdueLoans = async (req, res, next) => {
  try {
    const loans = await loanService.listOverdueLoans();
    res.json(loans);
  } catch (error) {
    next(error);
  }
}

const simulatefine = async (req, res, next) => {
  try {
    const loans = await loanService.simulatefine(req.params.id);
    res.json(loans);
  } catch (error) {
    next(error);
  }
}

const GeneralDashboard = async (req, res, next) => {
  try {
    const dashboard = await loanService.GeneralDashboard();
    res.json(dashboard);
  } catch (error) {
    next(error);
  }
}

const listUsersWithActiveLoans = async (req, res, next) => {
  try {
    const lsti = await loanService.listUsersWithActiveLoans();
    res.json(lsti);
  } catch (error) {
    next(error);
  }
}

export default {
  createLoan,
  getAllLoans,
  getLoanById,
  getLoansByUser,
  getLoanByActive,
  returnBook,
  listOverdueLoans,
  simulatefine,
  GeneralDashboard,
  listUsersWithActiveLoans
};