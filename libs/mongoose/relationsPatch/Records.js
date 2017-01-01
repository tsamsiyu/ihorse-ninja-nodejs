class BaseRecord {
    constructor(modelInstance, relationDefinition, mongoose) {
        this.modelInstance = modelInstance;
        this.relationDefinition = relationDefinition;
        this.mongoose = mongoose;
        this.data = null;
    }

    getRelationModel() {
        return this.mongoose.model(this.relationDefinition.relationModelName);
    }

    get(cb, update = false) {
        var context = this;
        let def = context.relationDefinition;
        if (context.data && !update) {
            cb(null, context.data);
        } else {
            let query = {};
            if (def.isRelationCarrier) {
                query[def.refAttribute] = context.modelInstance.get(def.relationAttribute);
            } else {
                query[def.relationAttribute] = context.modelInstance.get(def.refAttribute);
            }
            context.pullAction(query, function (err, res) {
                if (!err) {
                    context.data = res;
                }
                cb(err, res);
            });
        }
    }
}

class RecordsList extends BaseRecord {
    constructor() {
        super();
        this.data = [];
    }

    pullAction(query, cb) {
        this.getRelationModel().find(query, cb);
    }
}

class RecordItem extends BaseRecord {
    pullAction(query, cb) {
        this.getRelationModel().findOne(query, cb);
    }
}

module.exports.RecordsList = RecordsList;
module.exports.RecordItem = RecordItem;