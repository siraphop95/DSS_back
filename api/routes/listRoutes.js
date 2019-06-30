'use strict'


module.exports = function (app) {
    var userList = require('../controllers/userListController')
    var docList = require('../controllers/docListController')
    var drugList = require('../controllers/drugListController')
    var authen = require('../controllers/authenticationController')

    app.route('/users')
        .get(userList.listAllUsers)
        .post(userList.createAUser)

    app.route('/users/:userId')
        .get(userList.readAUser)
        .delete(userList.deleteAUser)
        .post(userList.updateAUser)

    app.route('/documents')
        .get(docList.listAllDocuments)
        .post(docList.createADocument)

    app.route('/new_questions/')
        .get(docList.listNewQuestions)

    app.route('/myqn_documents/:username')
        .get(docList.listMyQnDocuments)

    app.route('/myans_documents/:username')
        .get(docList.listMyAnsDocuments)

    app.route('/reply_inbox_documents/:username')
        .get(docList.listreplyInboxDocuments)

    app.route('/documents/:docId')
        .get(docList.readADocument)
        .delete(docList.deleteADocument)
        .post(docList.updateADocument)

    app.route('/drugs')
        .get(drugList.listAllDrugs)
        .post(drugList.createADrug)

    app.route('/login')
        .post(authen.login)
    app.route('/logout/:token')
        .get(authen.logout)
    app.route('/authentication')
        .get(authen.authentication)
}

