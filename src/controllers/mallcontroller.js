const Mall = require('../models/Mall');
const addMall = async (req,res) => {
    try{
        const {name, location, rating, description, facilities} = req.body;
        if(!name || !location) {
            return res.status(400).json({
                success:false,
                message:"Name ans Location are required"
            });
        }
        const newmall = await Mall({
            name,location,rating,description,facilities
        });
        await newmall.save();
        res.status(201).json({
            success:true,
            message:"Mall added successfully",
            data:newmall
        });

    }
    catch(error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
};
const getMalls = async (req,res) => {
    const malls = await Mall.find();
    res.json({
        success:true,
        count:malls.length,
        data:malls
    });
};

const getMall = async (req,res) => {  //-----------
    const mall = await Mall.findById(req.params.id);
    if(!mall) {
        return res.status(404).json({
            success:false,
            message:"Mall Not Found"
        });
    }
    res.status(201).json({
        success:true,
        data:mall
    });
};

const updatemall = async (req,res) => {
    try{
        const mall = await Mall.findByIdAndUpdate(req.params.id,req.body);
        if(!mall){
            return res.status(404).json({
                success:false,
                message:"MAll NOT FOUND"
            });
        }
        res.json({
            success:true,
            message:"MALL UPDATED SUCCESSFULLY",
            data:mall
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR"
        });
    }
};

const deletemall = async (req,res) => {
    try {
        const success = await Mall.findByIdAndDelete(req.params.id);
        if(!success){
        return res.status(404).json({
          success:false,
          message:"MALL NOT FOUND"
        });
        }
        res.json({
        success:true,
        message:"MALL DELETED SUCCESSFULLY"
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR"
        });
    }
};

const searchMall = async (req,res) => {
    try {
        const {minRating} = req.query;
        if(!minRating){
        return res.status(400).json({
            success:false,
            message:"MinRating is required"
        });
        }
    const filteredmall = await Mall.find({
        rating:{$gte : Number(minRating)}
    });
    res.json({
        success:true,
        count:filteredmall.length,
        minRating:parseFloat(minRating),
        data:filteredmall
    });}
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        });
    }

};

module.exports = {
    addMall,
    getMalls,
    getMall,
    updatemall,
    deletemall,
    searchMall
};
