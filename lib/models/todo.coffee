"use strict"

# lib/models/todo.js
mongoose = require("mongoose")
Schema = mongoose.Schema

###
Todo Schema
###
TodoSchema = new Schema(
  title: String
  completed: Boolean
  createdAt: Date
  updatedAt: Date
  user:
    type: Schema.ObjectId
    ref: "User"
)

# keep track of when todos are updated and created
TodoSchema.pre "save", (next, done) ->
  @createdAt = Date.now()  if @isNew
  @updatedAt = Date.now()
  next()
  return


###
Validations
###
TodoSchema.path("title").validate ((title) ->
  title.length
), "Title cannot be blank"

###
Statics
###
TodoSchema.statics.load = (id, cb) ->
  @findOne(_id: id).populate("user", "email name").exec cb
  return

mongoose.model "Todo", TodoSchema
