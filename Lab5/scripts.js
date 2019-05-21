'use strict';
(function () {
    let resultDiv =  document.getElementsByClassName('result')[0];
    let Model = {
        login(appId, params) {
            return new Promise((resolve) => {
                VK.init({ apiId: appId });

                VK.Auth.login(response => {
                    response.session ? resolve(response) : console.error('Auth error!');
                }, params)
            });
        },

        callApi(method, params) {
            return new Promise((resolve, reject) => {
                VK.api(method, params, response => {
                    if (response.error) { reject(new Error(response.error)); }
                    else { resolve(response.response);}
                });
            });
        },

        getUser() { return this.callApi('users.get', {"v":"any", 'name_case': 'gen'}, ); },
        getFriends() { return this.callApi('friends.get', {fields: 'photo_max', "v":"any"}); },
        getNews() { return this.callApi('wall.get', {filters: 'owner', count: 100, "v":"any"}); },
        getGroups() { return this.callApi('groups.get', {filters: 'owner', count: 100, "v":"any"}); },
        getGroupsById(id) { return this.callApi('groups.getById', {fields: 'description', "v":"any", group_ids: id}); },
    };
    let View = {
        render(templateName, model) {
            templateName = templateName + 'Template';

            let templateElement = document.getElementById(templateName),
                templateSourse = templateElement.innerHTML,
                renderFn = Handlebars.compile(templateSourse);

            return renderFn(model);
        }
    };
    let Controller = {
        friendsRoute() {
            return Model.getFriends().then(friends=>{
                resultDiv.innerHTML = View.render('friends', {list: friends});
            });
        },
        newsRoute() {
            return Model.getNews().then(news=>{
                resultDiv.innerHTML = View.render('news', {list: news});
            });
        },
        groupRoute() {
            return new Promise (resolve => {
                Model.getGroups().then(groups=>{
                    let groupObjectList = '';

                    for(let i=1; i < groups.length; i++)
                        groupObjectList += groups[i] + ', ';

                    resolve(Model.getGroupsById(groupObjectList.slice(0, groupObjectList.length - 2)));
                });
            }).then(groupList => {
                resultDiv.innerHTML = View.render('group', {list: groupList});
            });
        },
    };
    let Router = {
        handle(route){
            let routeName = route + 'Route';
            Controller[routeName]();
        }
    };
    new Promise (resolve => {
        window.onload = resolve;
    }).then(() => {
        return Model.login(6939410, 2 | 2048 | 8192 | 262144 | 14);
    }).then(() => {
        return Model.getUser().then(user => {
            document.getElementById('header').innerHTML = View.render('header', user[0]);
        });
    }).catch(error => console.error(error));
    document.getElementsByClassName('wrapper')[0].addEventListener('click', event => {
        event.target.dataset.info ? Router.handle(event.target.dataset.info): false;
    });
})();