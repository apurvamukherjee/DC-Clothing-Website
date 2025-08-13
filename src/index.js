import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

//make a commit on a given x (week) and y (day) offset
const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

// recursive function to create multiple commits
const makeCommits = (n) => {
  if (n === 0) {
    return simpleGit().push();
  }

  const x = random.int(51, 54); // random week offset
  const y = random.int(0, 6);  // random day offset
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  console.log(`Committing for date: ${date}`);

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(null, --n));
  });
};

// making commits (50 by default)
makeCommits(150);
