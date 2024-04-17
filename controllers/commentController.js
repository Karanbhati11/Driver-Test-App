const usermodel = require("../models/user");

module.exports = async (req, res) => {
  const { comment, testResult, userId } = req.body;

  console.log(comment, testResult, userId);

  const commentResult = {
    Comment: comment,
    TestResult: testResult,
  };

  const user = await usermodel.findByIdAndUpdate(userId, commentResult);

  console.log(user);
};
