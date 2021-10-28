'use strict';
let { URL } = require('url');
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  NoteBook = mongoose.model('NoteBookSchema');

exports.createNoteBook = function(req, res) {
    // intercept the request to check if user is authentificated
    const data = {...req.body, created_by: req.user._id, notes: 0}

    let newNoteBook = new NoteBook(data);
        //   console.log('Url ===>', new URL("http://localhost:3000" + req.url))
    
    newNoteBook.save(function(err, noteBook) {
        if (err) {
            return res.status(400).send({
                message: err,
            });
        } else {
            return res.json(noteBook);
        }
    })
};

exports.getNoteBook = function(req, res) {

    NoteBook.findOne({
            _id: req.body.id,
            created_by: req.user._id
        }, function(err, noteBook) {
            if (err) throw err;

            return res.status(200).json({ data: noteBook });
        }
    )
};

exports.deleteNotebook = function(req, res) {
    const id = req.body.id

    NoteBook.deleteOne({
            _id: req.body.id,
            created_by: req.user._id
        }, function(err) {
            if (err) {
                console.log(err.message)

                return res.status(400).json({message: err.message})
            } else {

                return res.status(200).json({ message: "Notebook successfully deleted" });
            }

        }
    )
};


exports.getNotesbooks = function(req, res) {
    const id = req.body.id
    let searchParams = new URL("http://localhost:3000" + req.url).searchParams
    let search = searchParams.get('search')
    // console.log("search=====>", searchParams.get('search'))

    NoteBook.find({
            created_by: req.user._id,
        }, function(err, resp) {
            if (err) {
                console.log(err.message)

                return res.status(400).json({message: err.message})
            } else {

                let response = resp.filter(resp => resp.title.includes(search || "") || resp.description.includes(search || ""))

                return res.status(200).json({ data:  response});
            }
        }
    )
};

exports.editNoteBook = function(req, res) {
    const notebook_id = req.params.notebook_id

    Note.findOneAndUpdate(
        {_id: notebook_id},
        {
            ...req.body,
            updated: new Date()
        }, function(err, resp) {
            if (err) {

                return res.status(400).json({message: err.message})
            } else {

                return res.status(200).json({ data:  resp});
            }
        }
    )
};