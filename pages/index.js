import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ad Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Effortlessly create engaging marketing and promotional content with the power of artificial intelligence and our AdGenerator.app</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
     <div className="prompt-container">
  <textarea
    placeholder="Simply enter what you want your email to be about"
    className="prompt-box"
    value={userInput}
    onChange={onUserChangedText}
  />
  {/* New code I added here */}
  <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>

  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Your Ad:</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}

</div>
        </div>
      </div>
     
    </div>
  );
};

export default Home;
