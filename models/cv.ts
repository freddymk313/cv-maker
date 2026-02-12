import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  description: String,
});

const EducationSchema = new Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
});

const CvSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, default: "Mon CV" },

    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      address: String,
      profilePicture: String,
      bio: { type: String, maxlength: 500 },
      linkedin: String,
      github: String,
      website: String,
    },

    experiences: [ExperienceSchema],
    education: [EducationSchema],

    skills: [
      {
        name: String,
        level: { type: Number, min: 1, max: 5 },
      },
    ],

    languages: [
      {
        language: String,
        level: {
          type: String,
          enum: ["Débutant", "Intermédiaire", "Avancé", "Langue maternelle"],
        },
      },
    ],

    templateId: { type: String, default: "classic" },

    isPublic: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

// À la toute fin de ton fichier Cv.ts
const Cv = mongoose.models.Cv || mongoose.model("Cv", CvSchema);
export default Cv;
