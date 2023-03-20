const Example = require('../models/example');

const examples = [
  { name: 'Example 1', completed: true}, 
  { body: 'Example 2', completed: false}
];
const oneExample = { name: 'Example 3', completed: true };


const addManyExamples = async () => {
  const savedExamples = await Example.insertMany(examples);
  console.log('=======> Saved Examples.');
  console.log(savedExamples);
}

const addOneExample = async () => {
  const savedOneExample = await Example.create(oneExample);
  console.log('=======> Saved One Example.');
  console.log(savedOneExample);
}

// run the functions
// addManyExamples();
// addOneExample();

const oneMessage = { content: 'This is the first message' };

const addOneMessage = async () => {
  const savedOneMessage = await db.Message.create(oneMessage);
  console.log('=======> Saved One Message.');
  console.log(savedOneMessage);
}

// run the function
addOneMessage();