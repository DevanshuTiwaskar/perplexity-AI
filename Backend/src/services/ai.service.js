const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateresulte(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.test
}

async function generateStream(prompt, onData) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  let responsetext = "";

  for await (const chunk of response) {
    responsetext += chunk.text;
    onData(responsetext);
  }
  return responsetext
}

module.exports = {
  generateresulte,
  generateStream,
};
