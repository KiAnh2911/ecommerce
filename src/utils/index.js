const _ = require("lodash");
const { Types } = require("mongoose");

const converToObjectIdMongodb = (id) => new Types.ObjectId(id);

const getInfoData = ({ object = {}, fields = [] }) => {
  return _.pick(object, fields);
};

module.exports = { getInfoData, converToObjectIdMongodb };
