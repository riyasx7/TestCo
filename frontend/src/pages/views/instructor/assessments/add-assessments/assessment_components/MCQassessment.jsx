import React, { useState } from "react";
import { styles } from "../../../../../../styles.js";
import backendApi from "../../../../../../backendAPI/index.js";

const MCQAssessment = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
      ],
    },
  ]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex].option = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionCorrectnessChange = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.map(
      (opt, index) => ({
        ...opt,
        isCorrect: index === optIndex, // Only the selected option is correct
      })
    );
    setQuestions(updatedQuestions);
  };

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = parseInt(e.target.value, 10);

    const updatedQuestions = Array.from(
      { length: newNumQuestions },
      (_, index) =>
        questions[index] || {
          question: "",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
        }
    );
    setNumQuestions(newNumQuestions);
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    if (questions.some((q) => !q.question.trim())) {
      alert("All questions must have a question text.");
      return false;
    }

    if (questions.some((q) => q.options.some((opt) => !opt.option.trim()))) {
      alert("All options must have text.");
      return false;
    }

    if (questions.some((q) => !q.options.some((opt) => opt.isCorrect))) {
      alert("Each question must have exactly one correct option.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const title = document.getElementById("assessment-title")?.value.trim();
    if (!title) {
      alert("Please provide a title for the assessment.");
      return;
    }

    // Prepare assessment data with correctness status
    const assessmentData = {
      assessmentType: "MCQ",
      title,
      numQuestions,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options.map((opt) => ({
          option: opt.option, // Ensure the key matches the schema
          isCorrect: opt.isCorrect,
        })),
      })),
    };

    console.log("Submitting assessment:", assessmentData);

    try {
      const response = await fetch(backendApi.createMCQAssessment.url, {
        method: backendApi.createMCQAssessment.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assessmentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Assessment created successfully!");
        // navigate(`/instructor/assessments`);
      } else {
        alert(`Failed to create assessment: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
      alert("An error occurred while creating the assessment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-y-auto sm:max-h-[35rem] md:max-h-[35rem] lg:max-h-[40rem] scrollbar-hide flex flex-col gap-2 rounded-lg">
        {/* Title Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center rounded-lg bg-myColor-light p-4">
            <label
              className="w-full lg:w-4/12 text-myColor-secondary font-medium "
              htmlFor="assessment-title"
            >
              Assessment Title
            </label>
            <input
              type="text"
              placeholder="Enter assessment title"
              id="assessment-title"
              className="w-full lg:w-9/12 px-4 py-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
            />
          </div>
          <div className="w-full flex sm:flex-col lg:flex-row justify-between items-center rounded-lg bg-myColor-light p-4">
            <label
              htmlFor="num-questions"
              className="w-full lg:w-4/12 text-myColor-secondary font-semibold"
            >
              Number of Questions:
            </label>
            <select
              id="num-questions"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              className="cursor-pointer w-full  lg:w-9/12 p-2 text-myColor-primary bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary transition-all"
            >
              {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scheduling Section */}
        <div
          id="scheduling-section"
          className="bg-myColor-light rounded-lg p-4 gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center gap-4">
              {/* Start Date & Time */}
              <div className="flex flex-col w-full">
                <label className="text-myColor-secondary font-semibold">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="w-full p-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-myColor-secondary font-semibold">
                  Start Time
                </label>
                <input
                  type="time"
                  id="start-time"
                  className="w-full p-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
                />
              </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-4 ">
              {/* End Date & Time */}
              <div className="flex flex-col w-full">
                <label className="text-myColor-secondary font-semibold">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  className="w-full p-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-myColor-secondary font-semibold">
                  End Time
                </label>
                <input
                  type="time"
                  id="end-time"
                  className="w-full p-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-myColor-light rounded-lg p-4">
          <div className="flex flex-col gap-4">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="flex flex-col gap-2 bg-myColor-light rounded-lg shadow-sm"
              >
                {/* Question Input */}
                <label className="text-myColor-secondary font-semibold">
                  Question {qIndex + 1}
                </label>
                <textarea
                  type="text"
                  placeholder={`Enter Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="w-full p-3 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary resize-none"
                ></textarea>

                {/* Options Inputs */}
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex flex-row items-center gap-3 bg-myColor-extraLight p-3 rounded-lg"
                    >
                      <label className="sm:3/12 md:w-2/12 lg:w-1/12 text-myColor-secondary font-medium bg-myColor-warning">
                        Option {optIndex + 1}:
                      </label>
                      <input
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        value={opt.option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, optIndex, e.target.value)
                        }
                        className="sm:w-7/12 md:w-8/12 lg:w-10/12 p-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
                      />
                      <select
                        value={opt.isCorrect ? "true" : "false"}
                        onChange={(e) =>
                          handleOptionCorrectnessChange(
                            qIndex,
                            optIndex,
                            e.target.value
                          )
                        }
                        className="sm:w-2/12 md:w-2/12 lg:1/12 cursor-pointer p-2 text-myColor-primary bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary transition-all"
                      >
                        <option value="false">Incorrect</option>
                        <option value="true">Correct</option>
                      </select>
                      {/* <input
                        type="radio"
                        name={`correctOption-${qIndex}`}
                        checked={opt.isCorrect}
                        onChange={() =>
                          handleOptionCorrectnessChange(qIndex, optIndex)
                        }
                        className="cursor-pointer"
                      /> */}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full h-[3rem] bg-myColor-primary text-white hover:bg-myColor-secondary rounded-lg cursor-pointer ${styles.montserratBold}`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MCQAssessment;
