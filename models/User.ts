import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Hashé avec bcrypt
  role: { 
    type: String, 
    enum: ['SUPER_ADMIN', 'CANDIDAT', 'COMPANY_ADMIN', 'HR_AGENT'], 
    default: 'CANDIDAT' 
  },
  // Pour les RH et les Admin Entreprise
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null },
  
  // Pour les candidats
  cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cv' }, 
  
  createdAt: { type: Date, default: Date.now },
});