import React, { useState } from "react";
import { styles } from "../../../../../../styles.js";
import { useNavigate } from "react-router-dom";
import backendApi from "../../../../../../backendAPI/index.js";

const TestCases = ({ testCasesNumber, questionNumber }) => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: testCasesNumber }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <p className="text-myColor-secondary font-semibold text-sm">
            Test Case {index}
          </p>
          <div className="w-full bg-myColor-extraLight rounded-lg p-4 flex flex-col gap-2">
            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor={`inputs-${questionNumber}-${index}`}
                className="text-myColor-secondary font-semibold text-sm"
              >
                Inputs
              </label>
              <input
                className="w-full h-[3rem] px-4 text-myColor-dark bg-white border border-myColor-medium rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-myColor-primary transition-all"
                id={`inputs-${questionNumber}-${index}`}
                type="text"
                placeholder="Enter the inputs"
              />
            </div>
            {/* Outputs */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor={`expected-outputs-${questionNumber}-${index}`}
                className="text-myColor-secondary font-semibold text-sm"
              >
                Expected Outputs
              </label>
              <input
                className="w-full h-[3rem] px-4 text-myColor-dark bg-white border border-myColor-medium rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-myColor-primary transition-all"
                id={`expected-outputs-${questionNumber}-${index}`}
                type="text"
                placeholder="Enter the expected outputs"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProblemStatement = ({ testCasesNumber, handleNumTestCasesChange, questionNumber }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Problem Statement Section */}
      <div className="flex flex-col gap-3 rounded-lg p-4 bg-myColor-extraLight">
        <label
          htmlFor={`problem-statement-${questionNumber}`}
          className="text-myColor-secondary font-semibold text-lg"
        >
          Problem Statement {questionNumber+1}
        </label>
        <textarea
          name={`problem-statement-${questionNumber}`}
          id={`problem-statement-${questionNumber}`}
          rows="8"
          placeholder="Write the problem statement here..."
          className="w-full p-4 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary transition duration-200 shadow-sm resize-none scrollbar-hide"
        ></textarea>
      </div>

      {/* Test Cases Section */}
      <div className="flex flex-col gap-3 rounded-lg p-4 bg-myColor-extraLight">
        <div className="flex flex-row justify-between items-center rounded-lg">
          <label
            htmlFor="test-cases"
            className="text-myColor-secondary font-semibold text-lg"
          >
            Problem Statement {questionNumber} : Test Cases
          </label>
          <select
            id={`test-cases-number-${questionNumber}`}
            name={`test-cases-number-${questionNumber}`}
            value={testCasesNumber}
            onChange={(e) => handleNumTestCasesChange(e, questionNumber)}
            className="w-[20rem] bg-white text-myColor-primary border border-myColor-medium rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-myColor-medium transition-all cursor-pointer"
          >
            <option value="">--Select number of test cases--</option>
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
        </div>

        {testCasesNumber ? (
          <div className="w-full flex flex-col rounded-lg bg-myColor-light p-4 gap-5">
            <TestCases testCasesNumber={parseInt(testCasesNumber)} questionNumber={questionNumber} />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center rounded-lg bg-white p-4 gap-2">
            <h1 className={`${styles.montserratLight} text-lg`}>
              Select the number of test cases to be visible!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

const CodingAssessment = () => {
  const [testCasesNumbers, setTestCasesNumbers] = useState({});
  const [numQuestions, setNumQuestions] = useState(1);
  const navigate = useNavigate();

  const handleNumTestCasesChange = (e, questionIndex) => {
    setTestCasesNumbers({
      ...testCasesNumbers,
      [questionIndex]: e.target.value,
    });
  };

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = parseInt(e.target.value);
    setNumQuestions(newNumQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assessmentData = {
      assessmentType: "Coding",
      title: document.getElementById("assessment-title")?.value || "", // Use optional chaining to safely get value
      numQuestions: numQuestions,
      questions: Array.from({ length: numQuestions }).map((_, index) => {
        const problemStatement = document.getElementById(`problem-statement-${index}`).value || "";
        const testCases = Array.from({ length: testCasesNumbers[index] || 0 }).map((_, testCaseIndex) => {
          const input = document.getElementById(`inputs-${index}-${testCaseIndex}`)?.value || "";
          const expectedOutput = document.getElementById(`expected-outputs-${index}-${testCaseIndex}`)?.value || "";
          
          
          return { input, expectedOutput };
          
        });
        console.log(testCases)
        return { problemStatement, testCases };
      })
    };

    try {
      const response = await fetch(backendApi.createCodingAssessment.url, {
        method: backendApi.createCodingAssessment.method,
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
      <div className="overflow-y-auto max-h-[40rem] scrollbar-hide flex flex-col gap-2 rounded-lg">
        {/* Title Section */}
        <div className="w-full flex flex-row justify-between gap-2 ">
          <div className="w-[50rem] flex flex-row justify-between items-center gap-2 p-4 bg-myColor-light rounded-lg">
            <label
              htmlFor="assessment-title"
              className="text-myColor-secondary font-medium"
            >
              Assessment Title
            </label>
            <input
              type="text"
              placeholder="Enter assessment title"
              id="assessment-title"
              className="w-9/12 px-4 py-2 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
            />
          </div>

          {/* Number of Questions */}
          <div className="w-[50rem] flex flex-row justify-between items-center p-4 bg-myColor-light rounded-lg">
            <label
              htmlFor="num-questions"
              className="text-myColor-secondary font-medium"
            >
              Number of Questions
            </label>
            <select
              id="num-questions"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              className="cursor-pointer w-[20rem] p-2 text-myColor-primary bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full rounded-lg bg-myColor-light p-4">
          {/* Render ProblemStatements for Each Question */}
          {Array.from({ length: numQuestions }).map((_, index) => (
            <div key={index} className="mb-3">
              <ProblemStatement
                testCasesNumber={testCasesNumbers[index] || ""}
                handleNumTestCasesChange={handleNumTestCasesChange}
                questionNumber={index}
              />
            </div>
          ))}
          <button
            type="submit"
            className={`w-full h-[3rem] bg-myColor-primary text-white hover:bg-myColor-secondary rounded-lg cursor-pointer ${styles.montserratBold} mt-4`}
          >
            Create Assessment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CodingAssessment;
