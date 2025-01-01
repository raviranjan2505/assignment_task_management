import User from "../models/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(3, { message: "Username alteast 3 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password alteast 6 characters long" }),
});


export const register = async (req, res) => {
  try {
    const { email, username, password,role } = req.body;

    if (!email || !username || !password || !role) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: "User already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashPassword, role });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email && !username || !password) {
      return res.status(400).json({ message: "Email/Username and Password are required" });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }] 
    }).select("+password");

   
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email/username or password" });
    }


    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging user" });
  }
};


export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};
export const allUsers = async(req, res)=>{
const allUser = await User.find();
if(!allUser){
  res.status(400).json({message:"No user found"})
}
return res.status(200).json({allUser})
}
export const updateProfile = async (req, res) => {
    try {
        const { username, email, role } = req.body;
    console.log(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { username, email, role },
          { new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json({ message: 'User updated successfully', updatedUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
      }
    };

    export const selfProfile = async (req, res) => {
      try {
       
        const user = await User.findById(req.params.id);
    
       
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User Fetched Successfully", user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error occurring in User fetching" });
      }
    };
    
    
export const selfUpdate =async(req, res)=>{
    try {
        const { username, email } = req.body;
    
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { username, email },
          { new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json({ message: 'Profile updated successfully', updatedUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile' });
      }
}


// Admin creates a manager's team by assigning users to the manager
export const createManagerTeam = async (req, res) => {
  const { managerId, teamMembers } = req.body; 
  try {
    const manager = await User.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    if (manager.role !== "manager") {
      return res.status(400).json({ message: "This user is not a manager" });
    }
    const users = await User.find({ '_id': { $in: teamMembers } });
    const invalidUsers = users.filter(user => user.role === 'manager');

    if (invalidUsers.length > 0) {
      return res.status(400).json({ message: "A manager cannot be added to a manager's team" });
    }
    manager.team.push(...teamMembers);
    await manager.save();
    res.status(200).json({ message: "Manager team created successfully", manager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating manager's team", error });
  }
};
