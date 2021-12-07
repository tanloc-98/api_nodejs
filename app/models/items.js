const MainModel 	= require(__path_schemas + 'items');


module.exports = {
    listItems : (params,option) => {
        let sort = {};
        let objWhere = {};
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        if(params.sortField) sort[params.sortField] = params.sortType;

        if(option.task == 'all'){
            return MainModel
                .find(objWhere)
                .select('name status')
                .sort(sort)
        }
        if(option.task == 'one'){
            return MainModel
                .findById(params.id)
                .select('name status')
        }
    },
    create : (item) => {
        return new MainModel(item).save();
    },
    deleteItem : (params,option) => { 
        if(option.task == 'one'){
            return MainModel
                .deleteOne({_id : params.id})
        }
    },
    editItem : (params,option) => { 
        if(option.task == 'edit'){
            return MainModel
                .updateOne({_id : params.id},params.body)
        }
    }, 
}