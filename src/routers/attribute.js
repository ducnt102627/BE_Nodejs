import { Router } from "express";
import { createAttribute, createValueAttribute, deleteAttribute, getAttribute, getAttributeById, updateAttribute, updateValueAttribute } from "../components/attribute";

const router = Router();
router.post("/attributes", createAttribute);
router.post("/attribute/:id/value", createValueAttribute);
router.get("/attributes", getAttribute);
router.get("/attribute/:id", getAttributeById);
router.put("/attribute/:id", updateAttribute);
router.put("/attribute/:id/value", updateValueAttribute);
router.delete("/attribute/:id", deleteAttribute);

export default router;