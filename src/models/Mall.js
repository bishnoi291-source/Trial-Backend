let malls = [{
        id:1000,
        name:"Trends",
        location:"Poata",
        rating:4.5,
        description:"Best Shopping Mall",
        facilities:[],
        createdAt:new Date()
    }];
const createMall = (mallData) => {
    const newMall = {
        id:Date.now().toString(), // Tempo ID
        name:mallData.name,
        location:mallData.location,
        rating:parseFloat(mallData.rating) || 0,
        description:mallData.description || " ",
        facilities:mallData.facilities || [],
        createdAt:new Date()
    };
    malls.push(newMall);
    return newMall;
};
const getALLMalls = () => malls;
const getMallById =(id) => malls.find(m =>m.id ===id);

const updateMall = (id,updatedata) =>{
    const index = malls.findIndex(m => m.id === id);
    if(index == -1) return null;
    malls[index] = {...malls[index],...updatedata};
    return malls[index];
}

const deleteMall = (id) =>{
    const index = malls.findIndex(m => m.id === id);
    if (index === -1) return false;
    malls.splice(index,1);
    return true;
}

const searchMallsByRating = (minRating) => {
    return malls.filter(m => m.rating >= parseFloat(minRating));
}
module.exports = {
    createMall,
    getALLMalls,
    getMallById,
    updateMall,
    deleteMall,
    searchMallsByRating
};