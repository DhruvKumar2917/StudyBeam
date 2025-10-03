// const Category = require("../models/Category")

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max)
// }
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body
//     if (!name) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" })
//     }
//     const CategorysDetails = await Category.create({
//       name: name,
//       description: description,
//     })
//     console.log(CategorysDetails)
//     return res.status(200).json({
//       success: true,
//       message: "Categorys Created Successfully",
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: true,
//       message: error.message,
//     })
//   }
// }

// exports.showAllCategories = async (req, res) => {
//   try {
//     const allCategorys = await Category.find()
//     res.status(200).json({
//       success: true,
//       data: allCategorys,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body

//     // Get courses for the specified category
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: "ratingAndReviews",
//       })
//       .exec()

//     console.log("SELECTED COURSE", selectedCategory)
//     // Handle the case when the category is not found
//     if (!selectedCategory) {
//       console.log("Category not found.")
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" })
//     }
//     // Handle the case when there are no courses
//     if (selectedCategory.courses.length === 0) {
//       console.log("No courses found for the selected category.")
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for the selected category.",
//       })
//     }

//     // Get courses for other categories
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     })
//     let differentCategory = await Category.findOne(
//       categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//         ._id
//     )
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//       })
//       .exec()
//     console.log()
//     // Get top-selling courses across all categories
//     const allCategories = await Category.find()
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//       })
//       .exec()
//     const allCourses = allCategories.flatMap((category) => category.courses)
//     const mostSellingCourses = allCourses
//       .sort((a, b) => b.sold - a.sold)
//       .slice(0, 10)

//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory,
//         mostSellingCourses,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }



const Category = require("../models/Category");

// Utility
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// ✅ Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    const category = await Category.create({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Show All Categories
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { name: 1, description: 1 });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Category Page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Selected category with published courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "ratingAndReviews" },
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Different category (other than selected)
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      differentCategory = await Category.findById(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    // Top selling courses (across all categories)
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    const allCourses = allCategories.flatMap((cat) => cat.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
