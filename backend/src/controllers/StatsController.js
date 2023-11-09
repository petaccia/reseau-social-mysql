const { Op } = require("sequelize");
const User = require("../models/User");
const Post = require("../models/Posts");
const Event = require("../models/Events");

const getFamilyMemberCount = async (req, res) => {
  try {
    const count = await User.count({ where: { familyId: req.params.id } });
    return res.status(200).json(count);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRecentPostCount = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const count = await Post.count({
      include :{model: User, where: {familyId: req.params.id}},
      where: { createdAt: { [Op.gte]: oneWeekAgo } },
    });
    return res.status(200).json(count);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUpcomingEventCount = async (req, res) => {
  try{
    const today = new Date();
    const count = await Event.count({
      where: { date: { [Op.gte]: today }, familyId: req.params.id },
    });
    return res.status(200).json(count);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getFamilyMemberCount,
  getRecentPostCount,
  getUpcomingEventCount,
}