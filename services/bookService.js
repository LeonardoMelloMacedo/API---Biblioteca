import Book from "../models/Book.js";
import Loan from "../models/Loan.js";

const createBook = async (data) => {
  const { titulo, autor, categoria, ano, quantidadeTotal, quantidadeDisponivel, ativo } = data;

  //   if (!titulo || !autor || !categoria || !ano || quantidadeTotal || quantidadeDisponivel === undefined || !ativo) {
  //     const error = new Error("titulo, autor, categoria, ano, quantidade Total, quantidade Disponivel e ativo são obrigatórios");
  //     error.statusCode = 400;
  //     throw error;
  //   }

  const bookExists = await Book.findOne({ titulo: titulo });

  if (bookExists) {
    const error = new Error("Já existe um livro cadastrado com esse nome");
    error.statusCode = 400;
    throw error;
  }

  return Book.create({
    titulo,
    autor,
    categoria,
    ano,
    quantidadeTotal,
    quantidadeDisponivel
  });
};

const getAllBooks = async () => {
  return Book.find();
};

const getBookById = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

const getBookByTitle = async (titulo) => {
  return Book.find({
    titulo: { $regex: titulo, $options: "i" }
  });
};

const getBookByCategory = async (categoria) => {
  return Book.find({ categoria: { $regex: categoria, $options: "i" } });
};


const updateBook = async (id, data) => {
  const book = await Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

const deactivateBook = async (id) => {
  const bookDeactivate = await Book.findById(id)

  if (!bookDeactivate) {
    const error = new Error("não foi possivel encontrar livro!");
    error.statusCode = 404;
    throw error;
  }

  bookDeactivate.ativo = false
  await bookDeactivate.save();

  return bookDeactivate;

};

export default {
  createBook,
  getAllBooks,
  getBookById,
  getBookByTitle,
  getBookByCategory,
  updateBook,
 deactivateBook
};