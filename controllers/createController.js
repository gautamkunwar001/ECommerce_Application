import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async(req,res) => {
    try{
        const {name} = req.body; 
        if(!name) {
            return res.status(401).send({message: "name is required"});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory) {
            return res.status(200).send({
                success: true,
                message:"category Already Exist"
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
         res.status(201).send({
            success: true,
            message:"new category created",
            category
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message:"Error in category",
        });

    }
}

// update category 
export const updateCategoryController = async(req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
const category= await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name)},
    {
         new: true
    }
);
res.status(200).send({
    success: true,
    message: "category Updated Successfully",
    category,
        });
    } 
    catch(error) {
    console.log(error);
    res.status(500).send ({
        success: false,
        message:"error while updating",
        error,
    })
  }
};

// get all category
export const  categoryController = async(req, res) => {
try {
const category = await categoryModel.find({});
res.status(200).send ({
    success:true,
    message: " All categories List",
    category,
})
} 
catch(error) {
    console.log(error);
    res.status(500).send({
        success: false,
        error,
        message:"error while getting all categories"
    })
}
};

// single category
export const singleCategoryController = async(req,res) =>{
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while getting single category"
        })
    }

};

// delete category controller
export const deleteCategoryController = async (req, res) => {
try {
    const  { id }  = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send ({
        success: true,
        message:"category Deleted Successfully",
    });
} 
catch(error) {
    console.log(error);
    res.status(500).send ({
        succcess: false,
        message: "error while deleting", 
        error,
    })
}
}