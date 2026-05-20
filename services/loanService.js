import Loan from "../models/Loan.js";
import User from "../models/User.js";
import Book from "../models/Book.js";

const createLoan = async (data) => {
  const { userId, bookId, dataDevolucao } = data;

  // if (!userId || !bookId || !dataDevolucao) {
  //   const error = new Error("userId, bookId e dataDevolucao são obrigatórios");
  //   error.statusCode = 400;
  //   throw error;
  // }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  const book = await Book.findById(bookId);

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  console.log(book.quantidadeDisponivel);

  if (book.quantidadeDisponivel <= 0) {
    const error = new Error("Este livro não está disponível para empréstimo");
    error.statusCode = 400;
    throw error;
  }
  book.quantidadeDisponivel = book.quantidadeDisponivel - 1;
  await book.save();

  const loan = await Loan.create({
    userId,
    bookId,
    dataDevolucao: dataDevolucao,

  });

  return loan
};

const getAllLoans = async () => {
  return Loan.find()
    .populate("userId")
    .populate("bookId");
};

const getLoanById = async (id) => {
  const loan = await Loan.findById(id)
    .populate("userId")
    .populate("bookId");

  if (!loan) {
    const error = new Error("emprestimo não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return loan;
};

const getLoansByUser = async (userId) => {
  return Loan.find({ userId })
    .populate("userId")
    .populate("bookId");
};

const getLoanByActive = async () => {
  return Loan.find({ ativo: true })
};

const returnBook = async (id) => {
  const loan = await Loan.findById(id)

  if (!loan) {
    const error = new Error("emprestimo não existe");
    error.statusCode = 404;
    throw error;
  }
  if (loan.quantidadeDisponivel <= 0) {
    const error = new Error("Este livro não está disponível para empréstimo");
    error.statusCode = 400;
    throw error;
  }
  const Loant = await Loan.findByIdAndUpdate(

    id,
    { dataDevolucao: Date.now() },
    { new: true, runValidators: true }


  )

  const Rhaynan = await Loan.findByIdAndUpdate(

    id,
    { status: "devolvido" },
    { new: true, runValidators: true }
  )

  const joao = await Book.findByIdAndUpdate(
    id,
    { $inc: { quantidadeDisponivel: 1 } },
    { new: true, runValidators: true }
  );

  const milissegundosDeAtraso = Date.now() - loan.dataPrevistaDevolucao
  const dias = milissegundosDeAtraso / (1000 * 60 * 60 * 24)
  const multa = dias * 2

  const advertence = await Loan.findByIdAndUpdate(
    id,
    {
      multa
    },
    { new: true, runValidators: true }
  )

  return loan;
}
const listOverdueLoans = async () => {
  const listOverdueLoans = await Loan.find({
    status: "emprestado", dataPrevistaDevolucao: { $lte: Date.now() }
  });
  return listOverdueLoans;
};

const simulatefine = async (id) => {

  const loan = await Loan.findById(id);

  if (!loan) {
    throw new Error('Empréstimo não encontrado');
  }

  const today = new Date();
  const dueDate = new Date(loan.dueDate);

  const diffMs = today - dueDate;

  const lateDays = Math.floor(
    diffMs / (1000 * 60 * 60 * 24)
  );

  if (lateDays <= 0) {
    return {
      loanId: loan.id,
      lateDays: 0,
      fine: 0
    };
  }

  const finePerDay = 2;

  const fine = lateDays * finePerDay;

  return {
    loanId: loan.id,
    lateDays,
    fine
  };
};

const GeneralDashboard = async () => {
  const totalUsuarios = await User.countDocuments();
  const totalUsuariosAtivos = await User.countDocuments({
    status: "ativo"
  })
  const totalLivros = await Book.countDocuments();
  const totalLivrosAtivos = await Book.countDocuments({
    status: "ativo"
  })
  const totalLivrosDisponiveis = await Book.countDocuments({
    quantidadeDisponivel: { $gt: 0 }
  })
  const totalEmprestimos = await Loan.countDocuments();
  const totalEmprestimosAtivos = await Loan.countDocuments({
    status: "pendente"
  })
  const totalEmprestimosAtrasados = await Loan.countDocuments({
    status: "pendente",
    dataPrevistaDevolucao: { $lt: new Date() }
  })
  const multas = await Loan.find();

  const totalMultasGeradas = await Loan.countDocuments({
    multa: { $gt: 0 }
  })

  return {
    totalUsuarios,
    totalUsuariosAtivos,
    totalLivros,
    totalLivrosAtivos,
    totalLivrosDisponiveis,
    totalEmprestimos,
    totalEmprestimosAtivos,
    totalEmprestimosAtrasados,
    totalMultasGeradas
  }
}

const listUsersWithActiveLoans = async () => {
  const lsti = await Loan.find
  ({
    status: "pendente"
  })
  return lsti;
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