import mongoose, { Schema } from "mongoose";

const Round0Schema = mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event1",
    },
    teamName: {
      type: String,
      unique: true,
    },
    teamLeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    teamNumber: {
      type: Number,
    },
    leaderName: {
      type: String,
    },
    leaderEmail: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    questionPointer: {
      type: Number,
      default: -1,
    },
    questionCategory: {
      type: String,
      default: "instruction",
    },
    easyOrder: [
      {
        type: Number,
      },
    ],
    mediumOrder: [
      {
        type: Number,
      },
    ],
    hardOrder: [
      {
        type: Number,
      },
    ],
    // caseOrder: [
    //   {
    //     type: Number,
    //   },
    // ],
    easyAnswers: [
      {
        type: Schema.Types.Mixed,
        default: Array(20).fill(null),
      },
    ],
    mediumAnswers: [
      {
        type: Schema.Types.Mixed,
        default: Array(20).fill(null),
      },
    ],
    hardAnswers: [
      {
        type: Schema.Types.Mixed,
        default: Array(20).fill(null),
      },
    ],
    // caseStudyAnswers: [
    //   {
    //     type: Schema.Types.Mixed,
    //     default: Array(4).fill(null),
    //   },
    // ],
    points: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },

    // members: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Users",
    //     },
    // ],
  },
  { collection: "Round0" }
);

export const Round0 =
  mongoose.models.Round0 || mongoose.model("Round0", Round0Schema);

// mcq store option No.
// multiple correct store array of correct options. eg. [1,2]
// 10 + 8 + 8 + 4
// easy medium hard caseStudy
//
