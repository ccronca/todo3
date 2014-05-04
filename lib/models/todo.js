'use strict';

// lib/models/todo.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var TodoSchema = new Schema({
    title: String,
    completed: Boolean,
    createdAt: Date,
    updatedAt: Date,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

// keep track of when todos are updated and created
TodoSchema.pre('save', function(next, done) {
    if (this.isNew) {
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
    next();
});

/**
 * Validations
 */
TodoSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
TodoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Todo', TodoSchema);
