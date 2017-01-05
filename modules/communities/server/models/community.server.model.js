'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Community Schema
 */
var CommunitySchema = new Schema({
  city: {
    type: String,
    default: '',
    required: 'Please fill Community city',
    trim: true
  },
  country: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  /////
  lat:{
    type: Number,
    default: 0,
    trim: true
  },
  lon:{
    type: Number,
    default: 0,
    trim: true
  },
  ///////
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Community', CommunitySchema);
