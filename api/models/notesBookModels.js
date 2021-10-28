'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
let NoteBookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  created_by: {
    type: String,
    trim: true,
    required: true
  },
  notes: {
    type: Number,
    default: 0
  }
  ,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

let NoteSchema = new Schema({
    title: {
      type: String,
      trim: true,
      required: true
    },
    content: {
      type: String,
      trim: true,
      required: true
    },
    notebook_id: {
      type: String,
      trim: true,
      required: true
    },
    created_by: {
      type: String,
      trim: true,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  });


// Register schemas
mongoose.model('NoteBookSchema', NoteBookSchema);
mongoose.model('NoteSchema', NoteSchema);