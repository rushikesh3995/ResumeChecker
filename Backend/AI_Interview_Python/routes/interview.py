
# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel, Field

# from services.question_generator import generate_questions

# router = APIRouter(prefix="/interview", tags=["AI Mock Interview"])


# class InterviewRequest(BaseModel):
#     domain: str = Field(min_length=2, max_length=60)
#     experience_level: str = Field(min_length=2, max_length=40)
#     question_count: int = Field(default=5, ge=3, le=10)


# @router.post("/generate-questions")
# def create_interview_questions(data: InterviewRequest):

#     try:
#         questions = generate_questions(
#             domain=data.domain,
#             experience_level=data.experience_level,
#             question_count=data.question_count
#         )

#         return {
#             "success": True,
#             "domain": data.domain,
#             "experience_level": data.experience_level,
#             "total_questions": len(questions),
#             "questions": questions
#         }

#     except ValueError as error:
#         raise HTTPException(status_code=503, detail=str(error))

#     except Exception as error:
#         print("Interview generation error:", str(error))
#         raise HTTPException(
#             status_code=502,
#             detail="Unable to generate questions. Please try again."
#         )









from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from services.question_generator import generate_questions
from services.answer_evaluator import evaluate_answer

router = APIRouter(prefix="/interview", tags=["AI Mock Interview"])


class InterviewRequest(BaseModel):
    domain: str = Field(min_length=2, max_length=60)
    experience_level: str = Field(min_length=2, max_length=40)
    question_count: int = Field(default=5, ge=3, le=10)


class AnswerRequest(BaseModel):
    domain: str = Field(min_length=2, max_length=60)
    experience_level: str = Field(min_length=2, max_length=40)
    question: str = Field(min_length=5, max_length=1000)
    answer: str = Field(min_length=2, max_length=5000)


@router.post("/generate-questions")
def create_interview_questions(data: InterviewRequest):
    try:
        questions = generate_questions(
            data.domain,
            data.experience_level,
            data.question_count
        )

        return {
            "success": True,
            "domain": data.domain,
            "experience_level": data.experience_level,
            "total_questions": len(questions),
            "questions": questions
        }

    except ValueError as error:
        raise HTTPException(status_code=503, detail=str(error))
    except Exception as error:
        print("Question generation error:", str(error))
        raise HTTPException(status_code=502, detail="Question generation failed.")


@router.post("/evaluate-answer")
def evaluate_candidate_answer(data: AnswerRequest):
    try:
        result = evaluate_answer(
            data.domain,
            data.experience_level,
            data.question,
            data.answer
        )

        return {
            "success": True,
            "evaluation": result
        }

    except ValueError as error:
        raise HTTPException(status_code=503, detail=str(error))
    except Exception as error:
        print("Answer evaluation error:", str(error))
        raise HTTPException(status_code=502, detail="Answer evaluation failed.")
