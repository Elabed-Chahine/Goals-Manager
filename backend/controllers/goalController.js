
const handler = require("express-async-handler")

const Goal = require('../models/goalModels')
const User = require('../models/userModel')

const getGoals = (req, res) => {
    
      Goal.find({user:req.user.id}).then((goals) => {res.status(200).json(goals);})
       .catch((err) => {
         throw new Error(err)
       });
  
};


const setGoal = (req, res) => {
    console.log(req.body.text);
    if(! req.body.text){
        res.status(400);
        throw new Error("please enter a goal info");
    }
    const goal = Goal.create({text: req.body.text, user:req.user.id}).then((goal) => {
        res.status(200).json(goal);
    }).catch((err) => {
      res.status(400) ;
      throw new Error(err)});
    
  
};






const updateGoal = handler ( async(req, res) => {

   
   const goal = await Goal.findById(req.params.id)

   if(!req.user || !goal){
     res.status(401);
     throw new Error('User or goal not found')
   }  
   if( goal.user.toString() !== req.user.id){
     res.status(400);
     throw new Error('user Not authorized to update this goal')

   }
   


    Goal.findByIdAndUpdate(req.params.id, req.body,{new:true}).then((goal)=>{ res.status(200).json(goal);}).catch(err => {console.log(err.message)})
  
})








const deleteGoal = handler( async (req, res) => {

   
    if(!req.user){  res.status(403);
    throw new Error('User not found')}

    const goal = await Goal.findById(req.params.id);
    if( goal.user.toString() !== req.user.id){
       res.status(400);
      throw new Error("User not allowed to delete this goal");
    }
    Goal.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(200).json({id: req.params.id});
      })
      .catch((err) => {
        console.log(err.message);
      });
  
})








module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
