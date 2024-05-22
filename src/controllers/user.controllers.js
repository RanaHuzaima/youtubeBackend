import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js"


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend ✅
    // validation — not empty ✅
    // check if user already exists: username, email ✅
    // check for images, check for avatar ✅
    // upload them to cloudinary, avatar ✅
    // create user object — create entry in db ✅
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { email, password, username, fullName } = req.body

    if (
        [email, password, username, fullName].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        email,
        password,
        fullName,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Login done"
    })
})

export { registerUser, loginUser }