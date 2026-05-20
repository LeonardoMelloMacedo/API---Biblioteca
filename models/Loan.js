import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    dataEmprestimo: {
      type: Date,
      default: Date.now,
    },
    dataPrevistaDevolucao: {
      type: Date,
      default: Date.now,
    },
    dataDevolucao: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["emprestado", "devolvido", "atrasado"],
      default: "emprestado",
    },
    multa: {
      type: Number,
      default: 0,
      min: 0,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "loans",
    timestamps: true,
  }
);

export default mongoose.model("Loan", LoanSchema);