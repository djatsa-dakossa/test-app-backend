'use strict';

module.exports = function(app) {
	
	let userHandlers = require('../controllers/userController.js');
	let noteBookHandlers = require('../controllers/notesBookController.js');
	let noteHandlers = require('../controllers/noteController.js');

	// notebook List Routes

    // This route takes {title: string, description: string} in the body
	app.route('/new/notebook')
		.post(userHandlers.loginRequired, noteBookHandlers.createNoteBook);


    // This route return the list of notes books created by the user doing the request
	app.route('/notesbooks')
		.get(userHandlers.loginRequired, noteBookHandlers.getNotesbooks);


    // This route takes {notebook_id: string} in the url the notebook_id here is the id of the notesbook we want to get details
    app.route('/notesbook/:notebook_id')
		.get(userHandlers.loginRequired, noteBookHandlers.getNoteBook);

    // This route takes {notebook_id: string} in the url. The notebook_id here is the id of the notesbook we want to delete.
	app.route('/notesbook/:notebook_id') 
		.delete(userHandlers.loginRequired, noteBookHandlers.deleteNotebook);

    // This route takes {notebook_id: string} in the url. The notebook_id here is the id of the notesbook we want to edit.
	app.route('/notesbook/:notebook_id') 
        .put(userHandlers.loginRequired, noteBookHandlers.editNoteBook);


    // Notes routes
        // This route takes {title: string, description: string} in the body
	app.route('/new/notebook/:notebook_id/note')
        .post(userHandlers.loginRequired, noteHandlers.createNote);


    // This route return the list of notes created by the user doing the request
    app.route('/notebook/:notebook_id/notes')
        .get(userHandlers.loginRequired, noteHandlers.getNotes);
 

    // This route takes ids in the url the note_id here is the id of the note we want to get details
    app.route('/notebook/:notebook_id/note/:note_id')
        .get(userHandlers.loginRequired, noteHandlers.getNote);

    // This route takes {id: string} in the body. The id here is the id of the notesbook we want to delete.
    app.route('/notebook/:notebook_id/note/:note_id')
        .delete(userHandlers.loginRequired, noteHandlers.deleteNote);

        // Edite one note
        app.route('/notebook/:notebook_id/note/:note_id')
            .put(userHandlers.loginRequired, noteHandlers.editNote);
    };
