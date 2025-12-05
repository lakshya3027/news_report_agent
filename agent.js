import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "@langchain/community/tools/serpapi";

const model = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

const searchTool = new SerpAPI(process.env.SERPAPI_KEY, {
  location: "India",
});

const tools = [searchTool];

async function main() {
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
    verbose: true,
  });

  const response = await executor.invoke({
    input: "Who is the Prime Minister of India?",
  });

  console.log(response.output);
}

main();
const agent = await initializeAgentExecutorWithOptions(
  [searchTool],
  model
);

// 🧪 Try a question
const res = await agent.invoke({
  input: "What is the latest news about ISRO?",
});

console.log("🧠 Final Output:", res.output);
