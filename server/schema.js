import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
type Visitor {
    _id : ID
    Email: String!
    FirstName: String!
    LastName: String!
    JobTitle: String
    MobileNumber: String
    Company: String
    Person: String!
    Visit: String!
    Image: String!
    UUID: String!
}
 type Query {
     getVisitor(_id: ID) : Visitor
     allVisitors: [Visitor]
 }
 input createVisitorInput{
    Email: String!
    FirstName: String!
    LastName: String!
    JobTitle: String
    MobileNumber: String
    Company: String
    Person: String!
    Visit: String!
    Image: String!
    UUID: String!
 }
 input updateVisitorInput{
    Email: String
    FirstName: String
    LastName: String
    JobTitle: String
    MobileNumber: String
    Company: String
    Person: String
    Visit: String
    Image: String
    UUID: String
 }
 type Mutation {
     createVisitor(input: createVisitorInput) : Visitor
     updateVisitor(_id: ID!, input: updateVisitorInput) : Visitor
     deleteVisitor(_id: ID!) : Visitor
 }
`;
export default makeExecutableSchema({
  typeDefs,
  resolvers
});
