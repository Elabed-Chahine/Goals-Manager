const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("./../controllers/goalController.js");

const {protect} = require('../middleware/authMiddleware')

router.route("/").get(protect,getGoals).post(protect,setGoal);
/*
 router.get("/",getGoals );
router.post("/",setGoal); */




router.route("/:id").delete(protect,deleteGoal).put(protect,updateGoal);
/* router.delete("/:id",deleteGoal );
router.put("/:id",updateGoal);
 */

module.exports = router