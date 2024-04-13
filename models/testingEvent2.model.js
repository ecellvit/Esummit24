import mongoose from 'mongoose';

const teamSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      unique: true,
    },
    teamLeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testingUsers',
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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'testingUsers',
      },
    ],
    teamCode: {
      type: String,
    }
  },
  { collection: 'testingEvent2' }
);

export const testingEvent2 =
  mongoose.models.testingEvent2 ||
  mongoose.model('testingEvent2', teamSchema);
