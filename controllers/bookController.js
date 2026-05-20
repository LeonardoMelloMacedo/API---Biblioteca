import bookService from "../services/bookService.js";

const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const getBookByTitle = async (req, res, next) => {
  try {
    const book = await bookService.getBookByTitle(req.params.titulo)
    res.json(book);
  } catch (error) {
    next(error)
  }
};

const getBookByCategory = async (req, res, next) => {
  try {
    const book = await bookService.getBookByCategory(req.params.categoria)
    res.json(book);
  } catch (error) {
    next(error)
  }
};

const updateBook = async (req, res, next) => {
  try {
    const user = await bookService.updateBook(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deactivateBook = async (req, res, next) => {
  try {
    const bookDeactivate = await bookService.deactivateBook(req.params.id);
    res.json(bookDeactivate);
  } catch (error) {
    next(error);
  }
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