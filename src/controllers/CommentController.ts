import {Request, Response} from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CommentController{
    constructor(){}
    async listComments(req: Request, res: Response){
        try{
            const comments = await prisma.comments.findMany();
            res.json(comments)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async createComment(req: Request, res: Response){        
        const commentData = req.body;        
        try{                                        
                const newComment = await prisma.comments.create({
                    data: {
                        ...commentData,               
                    }
                })
                console.log("Comentário criado com sucesso");
                res.json({
                    status: 200,
                    newComment: newComment,
                    })
        }catch(error){
            console.log("Erro ao criar comentário");
            res.json({
                status: 500,
                message: error
            })
        }    
    }
    async updateComment(req: Request, res: Response){
        const commentData = req.body;
        const commentId = req.params.id;
        try{
            const newComment = await prisma.comments.update({
                where: {
                    id: parseInt(commentId),
                },
                data: commentData,
            });
            console.log("comentário atualizado com sucesso");
            res.json({
                status: 200,
                newComment: newComment
            })
        }catch(error){
            console.log("Erro ao atualizar comentário");
            res.json({
                status: 500,
                message: error,
            })
            console.log(error);
        }
    }
    async deleteComment(req: Request, res: Response){
        const commentID = req.params.id;
        try{
            const commentDeleted = await prisma.comments.delete({
                where: {
                    id: parseInt(commentID)
                },
            })
            res.json({
                status: 200,
                commentDeleted: commentDeleted
            })
        }catch(error){
            res.json({
                status: 500,
                message: error
            })
        }
    }
    async nukeComments(req: Request, res: Response){
        try{ 
            const comments = await prisma.comments.deleteMany();

            res.json(comments)

            console.log("Comentarios obliterados com sucesso!!");
            res.status(200).json({
                status: 200,
                message: "Comentarios obliterados com sucesso!!"
            })
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "Erro ao obliterar comentários: Destruição interceptada",
            });
            console.log("Erro ao obliterar comentários: Destruição interceptada");
        }
    }
}

export default new CommentController;