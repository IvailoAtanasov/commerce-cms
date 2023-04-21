var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  let date = new Date();
  console.log("event: ", event);
  const {
    userName,
    request: {
      // only properties specified as required are available here
      userAttributes: { email, sub },
    },
  } = event;

  if (sub) {
    let params = {
      Item: {
        id: { S: sub },
        __typename: { S: "User" },
        username: { S: userName },
        email: { S: email },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
      },
      TableName: process.env.USERTABLE,
    };
    try {
      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (error) {
      console.log("Error: ", error);
    }
    context.done(null, event);
  } else {
    console.log("Error: Nothing was written in DynamoDB");
    context.done(null, event);
  }
};
