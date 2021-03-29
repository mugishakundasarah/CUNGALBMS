const {categories,validateCategory} = require('../../models/categories/category.model')
const formatResult = require('../../utils/import')
exports.getCategories = async(req, res)=>{
    try {
        const result = await categories.find();
        if(result) res.send(formatResult({status:200, data:result}))
        else{return res.send(formatResult({status:404, message:"No books yet created"}))}
    } catch (err) {
        return res.send(formatResult({status:400, message:"Couldn't find", data:err}))
    }

}
//Get api by id
exports.getCategoryById = async(req, res)=>{
    try {
        const id = req.params.id;
        const result = await categories.findbyId({_id:id});
        if(result) res.send(formatResult({status:200, data:result}))
    } catch (err) {
        return res.send(formatResult({status:400, message:"Couldn't find the category", data:err}))
    }
}

//post apis
exports.createCategory = async(req, res)=>{
    try {
        const {error, value} =  validateCategory(req.body)
        if(err){
            res.send(formatResult({status:400, message:"Error occured", data:err}))
        }
        else{
            const duplicate = await categories.findOne({name:req.body.name});
            if(!duplicate){
                const newCategory =  new categories(req.body);
                const result = await newCategory.save();
                if(!result){
                    return res.send(formatResult({status:401, message:"Couldn't save"}))
                }
                else{
                    return res.send(formatResult({status:200, message:"Category created successfully", data:result}))
                }
            }
            else{
                return res.send(formatResult({status:401, message:"Category has already been created"}))
            }
        }
    } catch (err) {
        return res.send(formatResult({status:400, message:"Couldn't create", data:err}))
    }
}

exports.updateCategory = async(req, res)=>{
    try {
        const id = req.params.id
        const validId = validateObjectId(id)
        if(validId){
            const validCategory = validateCategory(req.body)
             if(!validCategory){
            return res.send(formatResult({status:400, message:"Category is not valid"}))
        }
        else{
            const duplicate = await categories.find({
                _id:{
                    $ne:id
                }, name:req.body.name
            })
            if(duplicate){
                res.send(formatResult({status:401, message:""}))
            }
        }
        }
       
    } catch (err) {
        
    }
}