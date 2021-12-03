import express, { Router } from "express";
import { getAll, getOneById } from "./controller";

const router = express.Router()

router.get("/", getAll)
router.get("/:id", getOneById)

export default router