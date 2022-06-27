const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    body: {
      type: String,
      required: true,
    },
    authorId: {
      type: ObjectId,
      ref: "projectAuthor",
      required:true
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: [
        {
          type: String,
        },
      ]
    
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: String,
    },
    publishedAt: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogdoc", blogSchema);
