
import os
import json
import re
from google import genai
from dotenv import load_dotenv

load_dotenv()

MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")


def generate_questions(domain, experience_level, question_count=5):

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("Gemini API key is missing.")

    client = genai.Client(api_key=api_key)

    prompt = f"""
    You are an experienced technical interviewer.

    Generate {question_count} interview questions for:

    Domain: {domain}
    Experience Level: {experience_level}

    Requirements:
    1. Questions must match the selected domain.
    2. Match the difficulty to the experience level.
    3. Include practical and technical questions.
    4. Avoid duplicate questions.
    5. Questions should be suitable for a real interview.

    Return ONLY valid JSON in this format:

    [
      {{
        "question": "What is Java?",
        "category": "Core Technical",
        "difficulty": "Easy"
      }}
    ]
    """

    response = client.interactions.create(
        model=MODEL,
        input=prompt
    )

    result = response.output_text

    if not result:
        raise ValueError("Gemini returned an empty response.")

    # Remove optional Markdown code fences
    result = re.sub(r"^```(?:json)?\s*|\s*```$", "", result.strip())

    questions = json.loads(result)

    if not isinstance(questions, list) or len(questions) == 0:
        raise ValueError("Invalid question format returned by AI.")

    return questions
