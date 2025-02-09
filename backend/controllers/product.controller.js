import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts =  async (req, res) => {
    try {
      const products = await Product.find({}); // ✅ Add "await" to fetch data
  
      res.status(200).json({ success: true, data: products }); // ✅ Send response only once
    } catch (error) {
      console.log("Error in fetching products:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const updateProduct = async (req, res) => {
    const { id } = req.params ;
  
    const product = req.body ;
  
    if (! mongoose.Types.ObjectId.isValid(id)){
      res.status(404).json({success:false , message: "Invalid Product Id"});
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id , product , {new:true});
      res.status(200).json({success: true , data: updatedProduct});
    } catch (error) {
      res.status(500).json({success:false , message : "Server error"})
    }
  }


  export const createProduct = async (req,res)=>{
    const product = req.body ;

    if (!product.name || !product.price || !product.image){
        return res.send(400).json({ success:false , message:"Please provide all the details !" });
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success:true , data : newProduct});
    } catch (error) {
        console.error("Error in creating product:",error.message);
        res.status(500).json({ success: false , message:"Server error "});
    }
}

export const deleteProduct =  async (req, res) => {
  const { id } = req.params;  // Extract the ID from the route parameter

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const product = await Product.findById(id); // Find product by the valid ID

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne(); // Delete the product
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.log("Error in deleting product:", error.message);
    res.status(500).json({ error: error.message });
  }
};
