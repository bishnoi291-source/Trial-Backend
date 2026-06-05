const Mall = require('../models/Mall');
const addMall = (req,res) => {
    try{
        const {name, location, rating, description, facilities} = req.body;
        if(!name || !location) {
            return res.status(400).json({
                success:false,
                message:"Name ans Location are required"
            });
        }
        const newmall = Mall.createMall({
            name,location,rating,description,facilities
        });
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
const getMalls = (req,res) => {
    const malls = Mall.getALLMalls();
    res.json({
        success:true,
        count:malls.length,
        data:malls
    });
};
const getMall = (req,res) => {
    const mall = Mall.getMallById(req.params.id);
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

const updatemall = (req,res) => {
    try{
        const mall = Mall.updateMall(req.params.id,req.body);
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

const deletemall = (req,res) => {
    try {const success = Mall.deleteMall(req.params.id);
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

const searchMall = (req,res) => {
    try {
        const {minRating} = req.query;
        if(!minRating){
        return res.status(400).json({
            success:false,
            message:"MinRating is required"
        });
        }
    const filteredmall = Mall.searchMallsByRating(minRating);
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
