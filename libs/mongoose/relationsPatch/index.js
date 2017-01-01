var inflector = require('inflector-js');
var RecordItem = require('./Records').RecordItem;
var RecordsList = require('./Records').RecordsList;

module.exports = function(model) {
    var mongoose = this;
    model.relationsDefinitions = {};
    model.prototype.relations = {};

    var _generateRelationGetter = function (relationId) {
        var selfModel = this;
        var relationsDefinitions = selfModel.relationsDefinitions;
        Object.defineProperty(this.prototype, relationId, {
            get: function () {
                var relationDefinition = relationsDefinitions[relationId];
                if (!this.relations[relationId]) {
                    if (relationDefinition.one) {
                        this.relations[relationId] = new RecordItem(this, relationsDefinitions[relationId], mongoose);
                    } else {
                        this.relations[relationId] = new RecordsList(this, relationsDefinitions[relationId], mongoose);
                    }
                }

                return this.relations[relationId];
            }
        });
    };

    var _createRelation = function (relationModelName, options) {
        var camelizedRelationName = inflector.camelize(relationModelName, true);
        var relationId = options.name || camelizedRelationName;
        var relationAttribute;
        if (options.isRelationCarrier) {
            relationAttribute = camelizedRelationName + 'Id';
        } else {
            relationAttribute = inflector.camelize(this.modelName, true) + 'Id';
        }

        this.relationsDefinitions[relationId] = {
            relationAttribute,
            refAttribute: options.refAttribute || '_id',
            relationModelName,
            isRelationCarrier: !!options.isRelationCarrier,
            one: !!options.one
        };

        // console.log('--> RELATION ' + relationId, this.relationsDefinitions[relationId]);
        _generateRelationGetter.call(this, relationId);
    };

    model.hasOne = function (relationModelName, options = {}) {
        options = Object.assign(options, {
            isRelationCarrier: false,
            one: true
        });

        _createRelation.call(this, relationModelName, options);
    };

    model.belongsToOne = function (relationModelName, options = {}) {
        options = Object.assign(options, {
            isRelationCarrier: true,
            one: true
        });

        _createRelation.call(this, relationModelName, options);
    };
};