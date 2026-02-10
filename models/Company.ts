import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: String,
  logo: String,
  subscriptionStatus: { type: String, enum: ['FREE', 'PREMIUM', 'EXPIRED'], default: 'FREE' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // L'Admin Entreprise
});