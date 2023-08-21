import express from "express";
import cors from "cors";
import Chance from "chance";

const app = new express();
const chance = new Chance();

app.use(cors());
app.use(express.json());

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

app.get("", (req, res) => {
  const cmp = req.query.q?.toLowerCase() || "";
  const ans = animals.filter((animal) =>
    animal.type.toLowerCase().includes(cmp)
  );
  res.send(ans);
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
