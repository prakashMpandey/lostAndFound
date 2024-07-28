import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(username,password,email)
    if (
      [username, email, password].some((field) => {
        field?.trim() === " ";
      })
    ) {
      throw new ApiError(400, "enter all fields");
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      console.log("user already exists");
      throw new ApiError(400, "user already exists");
    }


    const user = await User.create({
      username: username,
      password: password,
      email: email,
    });
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      console.log("new user cannot be created");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "user created successfully"));
  } catch (error) {
    console.log(error);

    throw new ApiError(500, "internal server issue");
  }
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    console.log("user id", userId);
    const user = await User.findById(userId);
    console.log(user);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    console.log(user);
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "internal server error");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { loginInput, password } = req.body;
    let email, username;
  
    if (!(loginInput || password)) {
      console.log("no username found");
    }
    loginInput.indexOf("@") === -1
      ? (username = loginInput)
      : (email = loginInput);
  
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
     return res.status(404).json(new ApiError(404 ,{message:"no user found"}));
    }
  
    const checkPassword = await user.isPasswordCorrect(password);
  
    if (!checkPassword) {
      return res.status(400).json({message:"password is incorrect"})
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const loggedInUser = await User.findById(user._id, {
      password: 0,
      refreshToken: 0,
    });
  
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
   return res
      .status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, {loggedInUser,accessToken},"user logged in successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500,error,"something went wrong"))
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  console.log("user logged out")

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "user logged out successfully" });
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword || newPassword)) {
      throw new ApiError(400, "both fields required");
    }

    const user = await User.findById(req.user._id);

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
      throw new ApiError(400, "enter correct password");
    }

    if (oldPassword === newPassword) {
      throw new ApiError(400, "new password should be different");
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "password changed successfully"));
  } catch (error) {
    console.log("error occured while changing password");
    return res.status(500).send(error);
  }
});

const changeDetails = asyncHandler(async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!(username || email)) {
      throw new ApiError(400, "no field specified");
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { email: email, username: username } },
      { new: true, password: 0, refreshToken: 0 }
    );

    if (!user) {
      throw new ApiError(500, "something went wrong");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, user, "details changed successfully"));
  } catch (error) {
    throw new ApiError(500, "something went wrong");
  }
});
const addAndChangeAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.avatar;
  const existingAvatar = req.user.avatar;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }
  if (existingAvatar != "") {
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      throw new ApiError(500, "internal server error");
    }
    console.log(avatar);

    const user = await findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: avatar?.url } },
      { new: true, password: 0, refreshToken: 0 }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, user, "avatar updated successfully"));
  } else {
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      throw new ApiError(500, "internal server error");
    }
    console.log(avatar);

    const user = await findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: avatar?.url } },
      { new: true, password: 0, refreshToken: 0 }
    );

    await deleteOnCloudinary(existingAvatar);
    return res
      .status(200)
      .json(new ApiResponse(200, user, "avatar updated successfully"));
  }
});
const deleteAccount = asyncHandler(async (req, res) => {
  console.res
    .status(200)
    .json(new ApiResponse(200, {}, "account Deleted SuccessFully"));
});

const loggedInUser=asyncHandler(async (req,res)=>{
  
  return res.status(200).json({data:req.user})

})

export {
  deleteAccount,
  registerUser,
  loggedInUser,
  loginUser,
  logOutUser,
  changePassword,
  changeDetails,
  addAndChangeAvatar,
};
