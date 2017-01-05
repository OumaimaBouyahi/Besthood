'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
/**
 * Claim Schema
 */
var ClaimSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Claim name',
        trim: true
    },
    content: {
        type: String,
        default: '',
        required: 'Please fill Claim content',
        trim: true
    },
    /////
    lat: {
        type: Number,
        default: 0,
        trim: true
    },
    lon: {
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
    },
    votes: {
        type: Number,
        default: 0
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    comments: [{
        commentData: {
            type: String
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }]
});
ClaimSchema.plugin(deepPopulate);
mongoose.model('Claim', ClaimSchema);
