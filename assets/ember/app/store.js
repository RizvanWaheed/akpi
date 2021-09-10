telenor.ApplicationStore = DS.Store.extend({
	//adapter: telenor.Adapter
	namespace: 'api',
});
//telenor.Store = DS.Store.extend({
//  url: 'http://localhost:1234/telenor/api'; 
//});
//telenor.ApplicationSerializer = DS.LSSerializer.extend();
//telenor.ApplicationAdapter    = DS.LSAdapter.extend();
/*funcApplicationAdapter    = function(n){
    return DS.RESTAdapter.extend({ 
                namespace:users_api, 
                host:'http://localhost:1234/telenor/api' ,


           });
}*/
//telenor.ApplicationAdapter = funcApplicationAdapter('');
//telenor.UsersSerializer = DS.RESTSerializer.extend();
//telenor.UsersAdapter    = funcApplicationAdapter('users_api'); 
//telenor.RolesAdapter    = funcApplicationAdapter('roles_api');  

/*telenor.AccessAdapter = DS.RESTAdapter.extend({
    host: javaScriptApplicationRoot,
    namespace: 'accesses',//'careem/index.php',
});
telenor.UsersAdapter = DS.RESTAdapter.extend({
    host: javaScriptApplicationRoot,
    namespace: 'users'
});
telenor.RoleAdapter = DS.RESTAdapter.extend({
    host: javaScriptApplicationRoot,
    namespace: 'roles'
});
telenor.EmployeeAdapter = DS.RESTAdapter.extend({
    namespace: javaScriptApplicationRoot,
    buildURL: function(type, id){
        //console.log(type);  //console.log(id);
        var url = 'index.php/api/' + type + 's'; //this.pluralize(type.typeKey);
        if (id) {
            url += '/index/' + id;
        }
        // url += '.json';
        return url;
    }
});*/
/*telenor.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id',
    serializeId: function(id) {
        return id.toString();
    }
});*/
//telenor.UsersAdapter = DS.RESTAdapter.extend({
//  namespace: 'users_api',
//     host: "http://localhost:1234/telenor/api",
//host: "http://localhost:1234/telenor/api/users_api",
/*serializer: DS.RESTSerializer.extend({
    primaryKey: function(type) {
        return 'id';
    },

    serializeId: function(id) {
        return id.toString();
    }
})*/
//"http://localhost:1234/telenor/api/users_api";
//});
//telenor.RolesAdapter    = DS.RESTAdapter.extend({
//    namespace: 'roles_api',
//     host: "http://localhost:1234/telenor/api",
//host: "http://localhost:1234/telenor/api/users_api",
/*serializer: DS.RESTSerializer.extend({
    primaryKey: function(type) {
        return 'id';
    },

    serializeId: function(id) {
        return id.toString();
    }
})*/
//"http://localhost:1234/telenor/api/users_api";
//});
