const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.get('/login',mid.requiresSecure,mid.requiresLogout,controllers.account.loginPage);
    app.post('/login',mid.requiresSecure,mid.requiresLogout,controllers.account.login);

    app.get('/signup',mid.requiresSecure,mid.requiresLogout,controllers.account.signupPage);
    app.post('/signup',mid.requiresSecure, mid.requiresLogout,controllers.account.signup);

    app.get('/logout',mid.requiresLogin,controllers.account.logout);

    app.get('/getItems',mid.requiresLogin,controllers.item.getItems);
    app.get('/item',mid.requiresLogin,controllers.item.itemPage);
    app.post('/item',mid.requiresLogin,controllers.item.makeItem);

    app.get('/getNpcs',mid.requiresLogin,controllers.npc.getNpcs);
    app.get('/npc',mid.requiresLogin,controllers.npc.npcPage);
    app.post('/npc',mid.requiresLogin,controllers.npc.makeNpc);

    app.get('/getPlaces',mid.requiresLogin,controllers.place.getPlaces);
    app.get('/place',mid.requiresLogin,controllers.place.placePage);
    app.post('/place',mid.requiresLogin,controllers.place.makePlace);

    app.get('/getQuests',mid.requiresLogin,controllers.quest.getQuests);
    app.get('/quest',mid.requiresLogin,controllers.quest.questPage);
    app.post('/quest',mid.requiresLogin,controllers.quest.makeQuest);

    app.get('/getRules',mid.requiresLogin,controllers.rule.getRules);
    app.get('/rule',mid.requiresLogin,controllers.rule.rulePage);
    app.post('/rule',mid.requiresLogin,controllers.rule.makeRule);
    
    app.get('/',mid.requiresSecure,mid.requiresLogout,controllers.account.loginPage);
}

module.exports = router;