'use strict';

/**
 * @ngdoc service
 * @name navEditorApp.areas
 * @description
 * # areas
 * Factory in the navEditorApp.
 */
angular.module('navEditorApp')
  .factory('AreaService', function($http, _) {

    var def = $http.get('/api/areas/');

    // Public API here
    return {
      getAreas: function() {
        return def.then(function(response) {
          return response.data.Areas;
        });
      },
      addArea: function(area) {
        return def.then(function(response) {
          response.data.Areas.push(area);
        });
      },
      getGroups: function(areaId) {
        return def.then(function(response) {
          var area = _.findWhere(response.data.Areas, {Id: areaId});
          return area.Groups || (area.Groups = []);
        });
      },
      addGroup: function(areaId, group) {
        def.then(function(response) {
          _.findWhere(response.data.Areas, {Id: areaId}).Groups.push(group);
        });
      },
      getSubAreas: function(areaId, groupId) {
        return def.then(function(response) {
          var group = _.findWhere(_.findWhere(response.data.Areas, {Id: areaId}).Groups, {Id: groupId});
          return group.SubAreas || (group.SubAreas = []);
        });
      },
      addSubArea: function(areaId, groupId, subArea) {
        return def.then(function(response) {
          _.findWhere(_.findWhere(response.data.Areas, {Id: areaId}).Groups, {Id: groupId}).SubAreas.push(subArea);
        });
      },
      save: function() {
        def.then(function(response) {
          $http.post('/api/areas', response.data);
        });
      }
    };
  });
