"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
function AiConversation(mensagem) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const chatCompletion = yield groq.chat.completions
                .create({
                messages: [
                    {
                        role: "system",
                        content: `Ao receber um nome, você deve dizer apenas "valido" ou "invalido".
                              Nomes inválidos são nomes falsos, como nomes que uma pessoa não teria de verdade, feitos com intuito de humor ou ser pejorativo/ofensivo. 
                              Retorne sempre no formato JSON com a chave "classificação". Exemplo: {"classificação": "valido"}. 
                              Se não puder classificar, retorne {"classificação": "invalido"}.`,
                    },
                    {
                        role: "user",
                        content: mensagem
                    }
                ],
                model: "llama-3.1-70b-versatile",
            });
            const content = ((_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "";
            return content;
        }
        catch (error) {
            console.log("Erro no API do groq", error);
            return "";
        }
    });
}
exports.default = AiConversation;
