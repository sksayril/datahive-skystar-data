var express = require('express');
var router = express.Router();

let userModel = require('../models/user.model')
let loanDataModel = require('../models/loandata.model')

/* GET home page. */
// router.get('/', function(req, res, next) {
 
// });
router.post('/signUp',async (req, res)=>{
  try{
  let {Email,Password} =  req.body
  let checkUser = await userModel.find({Email:Email})
  if(checkUser.length >0){
    return res.json({
      message:"User Alredy Exist"
    })
  }
  else{
    let User_data = await userModel.create({Email:Email,Password:Password})
    return res.json({
      message:"User Cerated Successfull",
      data:User_data
    })
  }

  }catch(err){
return res.status(500)
  }
})

// Public POST API for Loan Data
router.post('/loan-data', async (req, res) => {
  try {
    const { name, loanData } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.'
      });
    }

    if (!loanData) {
      return res.status(400).json({
        success: false,
        message: 'Loan data is required.'
      });
    }

    // Create loan data entry (accepts any structure for loanData)
    const newLoanData = await loanDataModel.create({
      name: name,
      loanData: loanData // Can be any type: object, array, string, number, etc.
    });

    return res.status(201).json({
      success: true,
      message: 'Loan data stored successfully.',
      data: newLoanData
    });

  } catch (error) {
    console.error('Loan data storage error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while storing loan data.',
      error: error.message
    });
  }
});

module.exports = router;
