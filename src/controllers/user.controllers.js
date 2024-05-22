import { asyncHandler } from "../utils/asyncHandler.js"


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Register done"
    })
})

const loginUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message: "Login done"
    })
})

export { registerUser, loginUser }