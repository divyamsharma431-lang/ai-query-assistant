import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY is missing from the environment.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel(os.getenv("GEMINI_MODEL", "gemini-3.6-flash"))


def generate_response(prompt: str) -> str:
    """Generate a response for a user prompt."""
    response = model.generate_content(prompt)
    return response.text


if __name__ == "__main__":
    prompt = input("Ask a question: ")
    print(generate_response(prompt))