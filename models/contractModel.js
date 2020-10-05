const mongoose = require("mongoose");
const slugify = require("slugify");

const contractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Contract must have a name"],
    unique: true,
    trim: true
  },
  profil: [
    {
      desProfil: String,
      chargeProfil: Number,
      prixUnit: Number,
      prixTotal: Number
    }
  ],
  numMarche: {
    type: String,
    required: [true, "A Contract must have a numMarché"],
    unique: true
  },
  anneeContable: { type: Number, default: 1 },
  status: {
    type: String,
    default: "encours",
    enum: {
      values: ["encours", "payé"],
      message: "Difficulty must be either encours, payé"
    }
  },
  montantGlobal: {
    type: Number,
    required: [true, "Contract mus have a Global price"]
  },
  prestataire: {
    type: String,
    required: [true, "A Contract must have a Prestataire"]
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A Contract must have a description"]
  },
  images: [String],
  os: [
    {
      numOS: String,
      dateDebut: Date,
      dateFin: Date,
      montantGlobal: Number,
      dateReception: Date
    }
  ],
  dateDebut: { type: Date, default: Date.now() },
  dateFin: { type: Date, required: true }
});
//we create a model out of the schema
const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
