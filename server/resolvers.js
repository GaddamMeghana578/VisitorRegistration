import Visitor from "./models/visitor";

export const resolvers = {
  Query: {
    async allVisitors() {
      return await Visitor.find();
    },
    async getVisitor(_, { _id }) {
      return await Visitor.findById(_id);
    }
  },
  Mutation: {
    async createVisitor(_, { input }) {
      console.log("Creating Visitor");
      return await Visitor.create(input);
    },
    async updateVisitor(_, { _id, input }) {
      return await Visitor.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteVisitor(_, { _id }) {
      return await Visitor.findByIdAndRemove(_id);
    }
  }
};
