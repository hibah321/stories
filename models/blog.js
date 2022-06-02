const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug);

const storySchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});


const story = mongoose.model('story', storySchema);

module.exports = story