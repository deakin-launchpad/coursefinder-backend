'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrementModelID = require('./countIdModel');
const debug = require('debug')('app:newsModel')

var newsSchema = new Schema({
    id: { type: Number, unique: true, min: 1 },
    title: { type: String, required: true },
    description: { type: String },
    content: { type: { type: String, required: true, enum: ['HTML', 'VIDEO', 'LINKS'] } },
    tags: { type: String, required: true }, //University Name, department so we can filter it
    postedOn: { type: Date, default: Date.now() },
    postedBy: { type: String }
});

newsSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('news', this, next);
});

module.exports = mongoose.model('news', newsSchema);
