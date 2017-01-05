'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Project name',
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please fill Claim content',
    trim: true
  },
  profileImageURL: {
    type: String,
    default: 'modules/projects/client/img/profile/default.png'
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
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});
ProjectSchema.plugin(deepPopulate);
mongoose.model('Project', ProjectSchema);
