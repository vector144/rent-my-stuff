import mongoose from "mongoose";

const BlackListSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: String,
    required: true,
  },
});
BlackListSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const BlackList = mongoose.model("blackListTokens", BlackListSchema);
export default BlackList;
// This schema is used to store blacklisted tokens with their expiration time.
