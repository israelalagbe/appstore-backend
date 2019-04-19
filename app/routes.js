let express = require('express');
let mongodb = require('mongodb');

let passportService = require('./config/passport')
/* let TemplateController = require('./controllers/template.controller');
let UserController = require('./controllers/user.controller');

let OwnerController = require('./controllers/owner.controller'); */


const app = express();
/**
 * 
 * @param {app} app 
 */
module.exports = function(app){
    var apiRoutes = express.Router()
    /* apiRoutes.post('/auth/register',UserController.createUser)
    apiRoutes.post('/auth/login',UserController.loginUser)
    //apiRoutes.put('/auth/user',UserController.updateUser)
    apiRoutes.get('/owners',OwnerController.getOwners);
    apiRoutes.put('/owners/:owner_id',OwnerController.updateOwner);
    apiRoutes.delete('/owners/:owner_id',OwnerController.removeOwner);
    apiRoutes.get('/owners/:owner_id/templates',TemplateController.getTemplatesByUserID)
    apiRoutes.get('/templates',TemplateController.getTemplates)
    apiRoutes.post('/templates',TemplateController.createTemplate)
    apiRoutes.put('/templates/:template_id',TemplateController.updateTemplate)
    apiRoutes.get('/templates/:template_id',TemplateController.getTemplate)
    apiRoutes.delete('/templates/:template_id',TemplateController.deleteTemplate) */
    app.use('/api', apiRoutes);
}