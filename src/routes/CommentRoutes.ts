import { Router } from "express";

import CommentController from "../controllers/CommentController";

const CommentRouter = Router();


//Listar Comentários
CommentRouter.get("/comments", CommentController.listComments);

//Inserir Comentários
CommentRouter.post("/comment", CommentController.createComment);

// Atualizar Comentários
CommentRouter.put("/comment/:id", CommentController.updateComment);

// Deletar Comentários
CommentRouter.delete("/comment/:id", CommentController.deleteComment);

CommentRouter.delete("/comments", CommentController.nukeComments);

export default CommentRouter;