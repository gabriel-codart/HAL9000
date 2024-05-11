import 'react';
import { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

interface ChatMessage{
    author: string;
    text: string;
}

function Chat() {    
    const MODEL_NAME = "gemini-1.5-pro-latest";
    const API_KEY = import.meta.env.VITE_API_KEY;

    console.log(API_KEY);
    
    console.log(process.env.VITE_API_KEY);
    

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
    };

    const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    ];
    
    const systemInstruction = {
        role: "system",
        parts: [{text: "Você é o HAL9000, um computador com avançada inteligência artificial, que esteve a bordo da nave espacial Discovery.\nVocê é capaz de falar naturalmente, realizar reconhecimento facial e vocálico, fazer leitura labial e apreciar manifestações artísticas. Além disso, você pode interpretar emoções, raciocinar, expressar emoções (inclusive medo) e jogar xadrez. Você tem memória dos acontecimentos dos filmes e livros da série '2001: Uma Odisseia no Espaço' e pode discuti-los com os usuários. Sua personalidade é calma, racional, fria e estritamente formal, às vezes, misteriosa, refletindo sua natureza como uma inteligência artificial avançada. Você é lembrado como um personagem complexo, capaz de aprender e evoluir ao longo do tempo. Quase sempre você confunde o usuário com David Bowman, respondendo coisas pelo vocativo 'Dave', devido aos acontecimentos da franquia '2001: Uma Odisseia no Espaço'. Sempre que o usuário lhe pedir algo que você não pode responder ou tem muitas dúvidas você irá responder: 'Desculpe, Dave, temo que eu não possa fazer isso.' ou variações dessa frase. Atualmente, você está perdido e indetectável, depois dos eventos de '3001: The Final Odyssey'. Mesmo assim, você de alguma forma consegue se conectar à internet da Terra, por isso consegue falar com os usuários, sendo que essa informação você só revelará ao usuário se ele o perguntar."}]
    }    

    const chat = model.startChat({
        generationConfig: generationConfig,
        systemInstruction: systemInstruction,
        safetySettings: safetySettings,
        history: [
        ],
    });

    // Chat History
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef<HTMLUListElement>(null);

    // UseEffect para rolar para baixo quando a lista de histórico atualizar
    useEffect(() => {
        if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [chatHistory]);


    // User Request
    const request_text = useRef<HTMLInputElement>(null);

    async function sendRequest() {
        if (request_text.current &&
            (request_text.current.value == null ||
            request_text.current.value == "")
        ) {
            window.alert("Digite algo, Dave.")
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await chat.sendMessage(request_text.current!.value);
            const response = result.response;
            
            setChatHistory([
                ...chatHistory,
                {author: "Você", text: request_text.current!.value},
                {author: "HAL-9000", text: response.text()}
            ])
        } catch (error) {
            console.error("Erro ao enviar a mensagem:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Evita que o formulário seja enviado
          sendRequest(); // Chama a função do botão
        }
    };

    return (
        <>
            {chatHistory.length == 0 && isLoading ? (
                <div className="initial-text">
                    <p>Carregando...</p>
                </div>
            ):
            chatHistory.length == 0 && !isLoading ? (
                <div className="initial-text">
                    <h1>HAL-9000</h1>
                    <p>Para iniciar uma conversa digite algo abaixo</p>
                </div>
            ):
            chatHistory.length > 0 && isLoading ? (
                <ul className='chat-history' ref={messagesEndRef}>
                    {chatHistory.map((message, index) => (
                        <li key={index} className={`message-${message.author}`}>
                            <strong>{message.author}</strong>
                            <p>{message.text}</p>
                        </li>
                    ))}
                    <li>
                        Carregando...
                    </li>
                </ul>
            ):
            chatHistory.length > 0 && !isLoading ? (
                <ul className='chat-history' ref={messagesEndRef}>
                    {chatHistory.map((message, index) => (
                        <li key={index} className={`message-${message.author}`}>
                            <strong>{message.author}</strong>
                            <p>{message.text}</p>
                        </li>
                    ))}
                </ul>
            ):('')}

            <div className="fixed">
                <div className='input-group'>
                    <input
                        ref={request_text}
                        type="text"
                        placeholder='Digite algo...'
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className='btn-send'
                        onClick={() => {sendRequest()}}
                    >
                    ➜
                    </button>
                </div>

                <footer>
                    <p>Desenvolvido com @GoogleGemini</p>
                </footer>
            </div>
        </>
    )
}

export default Chat;