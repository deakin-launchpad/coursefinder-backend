'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: { type: String, required: true, enum: ['HTML', 'VIDEO', 'LINKS'] }, value:{ type: String, required: true} },
    tags: { type: String, required: true }, //University Name, department so we can filter it
    postedOn: { type: Date, default: Date.now() },
    postedBy: { type: String }
});


module.exports = mongoose.model('news', newsSchema);
