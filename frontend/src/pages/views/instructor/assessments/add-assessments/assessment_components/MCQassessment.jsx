import React, { useState } from "react";
import { styles } from "../../../../../../styles.js";

const MCQAssessment = () => {
  const [numQuestions, setNumQuestions] = useState(1); 
  const [questions, setQuestions] = useState(
    Array.from({ length: numQuestions }, () => ({
      question: "",
      options: ["", "", "", ""],
    }))
  );

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = parseInt(e.target.value);
    setNumQuestions(newNumQuestions);
    setQuestions(
      Array.from(
        { length: newNumQuestions },
        (_, index) =>
          questions[index] || { question: "", options: ["", "", "", ""] }
      )
    );
  };

  const handleSubmit = () => {
    console.log("Submitted Questions:", questions);
    alert("Questions submitted successfully!");
  };

  return (
    <div className="overflow-y-auto max-h-[40rem] scrollbar-hide flex flex-col gap-2 rounded-lg ">

      <div className="flex flex-row justify-between items-center gap-2">
        {/* Title section */}
      <div className="w-full h-[auto] flex flex-row justify-between items-center rounded-lg bg-myColor-light p-4">
            <label className="w-3/12 text-myColor-secondary font-medium"
            htmlFor="assessment-title">
              Assessment Title
            </label>
            <input
              type="text"
              placeholder={`Enter assessment title`}
              
              id="assessment-title"
              className="w-9/12 px-4 py-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
            />
          </div>
        {/* Header Section */}
      <div className="w-full h-[auto] flex flex-row justify-between items-center rounded-lg bg-myColor-light p-4">
        <label
          htmlFor="num-questions"
          className="text-myColor-secondary font-semibold "
        >
          Number of Questions:
        </label>
        <select
          id="num-questions"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          className="cursor-pointer w-[20rem]  p-2 text-myColor-primary bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary transition-all scrollbar-hide"
        >
          {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="bg-myColor-light rounded-lg p-4" >
        {/* Questions Section */}
        <div className="flex flex-col gap-4">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="flex flex-col gap-2 bg-myColor-light  rounded-lg shadow-sm"
            >
              {/* Question Input */}
              <div className="flex flex-col gap-2">
                <label className="text-myColor-secondary font-semibold ">
                  Question {qIndex + 1}
                </label>
                <textarea
                  type="text"
                  placeholder={`Enter Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="w-full p-3 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary resize-none scrollbar-hide"
                ></textarea>
              </div>

              {/* Options Inputs */}
              <div className="flex flex-col gap-2">
                {q.options.map((opt, optIndex) => (
                  <div
                    key={optIndex}
                    className="flex flex-row items-center gap-3 bg-myColor-extraLight p-3 rounded-lg"
                  >
                    <label className="w-1/12 text-myColor-secondary font-medium">
                      Option {optIndex + 1}:
                    </label>
                    <input
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qIndex, optIndex, e.target.value)
                      }
                      className="w-full p-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
                    />
                  </div>
                ))}
              </div>
              
            </div>
          ))}
          {/* Submit Button */}
          <button
          onClick={handleSubmit}
          className={`w-[full] h-[3rem] bg-myColor-primary text-white hover:bg-myColor-secondary rounded-lg cursor-pointer ${styles.montserratBold}`}
          // onClick={createAssessment}
        >
          Submit
        </button>
        </div>

        
      </div>
    </div>
  );
};

export default MCQAssessment;
