'use strict';
let { URL } = require('url');
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  Note = mongoose.model('NoteSchema'),
  NoteBook = mongoose.model('NoteBookSchema');

exports.createNote = function(req, res) {
    // intercept the request to check if the notebook_id exists 
    let notebook_id = req.params.notebook_id
    let body = req.body
    NoteBook.findOne({
            _id: notebook_id,
            created_by: req.user._id
        }, (err, note) => {
            console.log("found ===>", note)
            if (err) {
                return res.status(400).send({
                    message: err,
                });
            } else if (!note) {
                return res.status(404).json({ message: "The notebook_id you provided doesn't exist" });
            } else if(note) {
                req.body.notebook_id = notebook_id
                const data = {...req.body, created_by: req.user._id}
                console.log('data === >', body)
                let newNote = new Note(data);
                    //   console.log('Url ===>', new URL("http://localhost:3000" + req.url))
                
                // Incremente the notes attribute in notebook object

                NoteBook.findOneAndUpdate(
                    {_id: notebook_id},
                    {notes: note.notes + 1},
                    (err, res) => {}
                )
                
                newNote.save(function(err, note) {
                    if (err) {
                        return res.status(400).send({
                            message: err,
                        });
                    } else {
                        return res.status(200).json(note);
                    }
                })
            }

        }
    )
};
 
exports.getNote = function(req, res) {
    let note_id = req.params.note_id
    const notebook_id = req.params.notebook_id

    Note.findOne({
            _id: note_id,
            created_by: req.user._id,
            notebook_id: notebook_id,
        }, function(err, note) {
            if (err) {
                return res.status(400).send({
                    message: err,
                });
            } else {
                return res.status(200).json({ data: note });
            }

        }
    )
};

exports.deleteNote = function(req, res) {
    
    let note_id = req.params.note_id
    const notebook_id = req.params.notebook_id

    NoteBook.deleteOne({
            _id: note_id,
            created_by: req.user._id,
            notebook_id: notebook_id
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


exports.getNotes = function(req, res) {
    const notebook_id = req.params.notebook_id
    let searchParams = new URL("http://localhost:3000" + req.url).searchParams
    let search = searchParams.get('search')
    let sort = searchParams.get('sort')
    // console.log("search=====>", searchParams.get('search'))

    Note.find({
            created_by: req.user._id,
            notebook_id: notebook_id
        }, null, {sort: {created: sort === "asc" ? 1 : -1}}, function(err, resp) {
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

exports.editNote = function(req, res) {
    const note_id = req.params.note_id

    Note.findOneAndUpdate(
        {_id: note_id},
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

// Check every time if the notebook_id really exists

exports.verifyNoteBook_id = function(req, res, next) {

    NoteBook.findOne({
        created_by: req.user.id,
        _id: req.body.noteBook_id
    }, (err, resp) => {
        if(err) {

            return res.status(400).json({message: err.message})
        } else if (resp) {
            next()
        } else {
            return res.status(400).json({message: "The provided notebook id is not registered"})
        }
    })
};