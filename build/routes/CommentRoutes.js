"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const CommentRouter = (0, express_1.Router)();
//Listar Comentários
CommentRouter.get("/comments", CommentController_1.default.listComments);
//Inserir Comentários
CommentRouter.post("/comment", CommentController_1.default.createComment);
// Atualizar Comentários
CommentRouter.put("/comment/:id", CommentController_1.default.updateComment);
// Deletar Comentários
CommentRouter.delete("/comment/:id", CommentController_1.default.deleteComment);
CommentRouter.delete("/comments", CommentController_1.default.nukeComments);
exports.default = CommentRouter;
