const { model, Schema } = require('mongoose');

const user = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'friends' }],
  votes: [{ type: Schema.Types.ObjectId, ref: 'votes' }],
  rating: { type: Number, default: "100" },
  socials: {
    github: { type: String, default: "" },
    codechef: { type: String, default: "" },
    hackerrank: { type: String, default: "" }
  },
  token: { type: String, default: "" }
}, {timestamps: true});

model('users', user);

module.exports = {
  model: model('users'),
  schema: user,
};