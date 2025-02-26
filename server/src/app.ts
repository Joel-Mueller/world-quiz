import express from "express";
import cors from "cors";
import { PlaceLoader } from "./ressources/PlaceLoader";
import { Place } from "./ressources/Place";
import { PlaceManager } from "./ressources/PlaceManager";
import { Tag, TagFinder } from "./ressources/Tag";
import { Category, CategoryFinder } from "./ressources/Category";
import { QuizManager } from "./quiz/QuizManager";

const app = express();
const port = 3000;
const pathToData: string = "../../../data";

const placeManager: PlaceManager = new PlaceManager(pathToData);
const quizManager: QuizManager = new QuizManager(placeManager);

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  let tags: Tag[] = [];
  tags.push(Tag.OCEANS_AND_SEAS);
  tags.push(Tag.NORTH_AMERICA);
  res.send(placeManager.getWithFilter(tags, Category.MAP, Category.NAME));
});

// Create a new quiz
app.post("/quiz", (req, res) => {
  const { tags, frontCategory, backCategory } = req.body;
  
  if (!tags || !frontCategory || !backCategory) {
      res.status(400).json({ error: "Missing required parameters" });
  }

  let tagsTag : Tag[] = [];
  for (const t of tags) {
    tagsTag.push(TagFinder.getEnumByString(t))
  }
  const frontCat = CategoryFinder.getEnumByString(frontCategory);
  const backCat = CategoryFinder.getEnumByString(backCategory);
  
  quizManager.createQuiz(tagsTag, frontCat, backCat);
  res.status(201).json({ 
    message: "Quiz created successfully",
    id: 1
  });
});

// Get the current card of a quiz
app.get("/quiz/:id/card", (req, res) => {
  const quizId = parseInt(req.params.id);
  const card = quizManager.getCurrentCard(quizId);
  
  if (!card) {
      res.status(404).json({ error: "Quiz not found or no current card available" });
  }

  res.json(card);
});

// Submit a guess
app.post("/quiz/:id/guess", (req, res) => {
  const quizId = parseInt(req.params.id);
  const { guessed } = req.body;
  
  if (typeof guessed !== "boolean") {
      res.status(400).json({ error: "Invalid guess value" });
  }
  
  const result = quizManager.guessed(quizId, guessed);
  res.json({ success: result });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
