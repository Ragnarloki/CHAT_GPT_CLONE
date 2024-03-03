import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = async () => {
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );

      const assistantReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { role: 'assistant', content: assistantReply }]);
    } catch (error) {
      console.log("error siva")
      console.error('Error fetching response from OpenAI:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleUserInput}>Send</button>
      </div>
    </div>
  );
};

export default App;
