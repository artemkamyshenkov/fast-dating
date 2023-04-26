const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    pageId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

module.exports = model('Comment', schema);
