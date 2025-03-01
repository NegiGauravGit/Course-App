const Router = require("express");
const jwt = require('jsonwebtoken');
const adminRouter = Router();
const { adminModel, courseModel } = require("../dataBase/db");
const {z} = require('zod')
const bcrypt = require('bcrypt')
const {adminAuth} = require("../middleware/adminMiddleware")

const adminInfoSchema = z.object({
    email:z.string().email("Invalid email format"),
    password:z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
})
const signUpSchema = adminInfoSchema.extend({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required")
})

adminRouter.post("/signUp", async function (req, res) {
  try {
    const validatedData = signUpSchema.parse(req.body);

    const { email, password, firstName, lastName } = validatedData;

    const hashPassword = await bcrypt.hash(password, 5);

    await adminModel.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.status(200).json({ msg: "Admin is signed up successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
adminRouter.post("/signIn", async function (req, res) {
  try {
    const validatedData = adminInfoSchema.parse(req.body);
    const { email, password } = validatedData;

    const findAdmin = await adminModel.findOne({ email });

    if (!findAdmin) {
      return res
        .status(404)
        .json({ message: "Admin not found. Please sign up first." });
    }

    const passwordCompare = await bcrypt.compare(password, findAdmin.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: findAdmin._id.toString() },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "1h" } // Optional: token expiry
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
adminRouter.post("/course", adminAuth,async function (req, res) {
  const adminId = req.adminId;

  const {title,description,price,imageUrl} = req.body

  const newCourse = await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    adminId
  })

  res.status(200).json({message: "course is created successfully",
    courseId: newCourse._id})
});

adminRouter.put("/updateCourse",adminAuth, async function (req, res) {
  const adminId = req.adminId

  const {title,description,price,imageUrl,courseId} = req.body

  await courseModel.updateOne({
    _id:courseId,
    creatorId: adminId
  },{
    title,
    description,
    price,
    imageUrl,
  })

  res.status(200).json({message: "course is updated successfully"})
});
adminRouter.get("/course/bulk", adminAuth,async function (req, res) {
  const adminId = req.adminId
  try{
    const allCourses = await courseModel.find({
      creatorId: adminId
    })
    res.status(200).send(allCourses)
  }
  catch(error){
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
