import { Router } from "express";
import {
  add_todo,
  getTodolist,
  deletetodo,
  updatestatus,
} from "../controllers/todo.js";

const router = Router();

router.get("/todos", getTodolist);
router.post("/addtodo", add_todo);
router.delete("/deletetodo/:id", deletetodo);
router.put("/updatetodo/:id", updatestatus);

export default router;
