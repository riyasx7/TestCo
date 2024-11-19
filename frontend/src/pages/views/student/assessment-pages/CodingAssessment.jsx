import { useEffect, useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";

import backendApi from "../../../../backendAPI/index.js";

const CodingAssessment = () => {
  const [code, setCode] = useState("# Write your code here");
  const [language, setLanguage] = useState("python");
  const [assessmentData, setAssessmentData] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [CurrentTestCaseNumber, setCurrentTestCaseNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(assessmentData);
  // Function to fetch coding assessment data
  const fetchCodingAssessmentData = useCallback(async () => {
    try {
      const response = await fetch(backendApi.codingAssessmentDataPull.url, {
        method: backendApi.codingAssessmentDataPull.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAssessmentData(data?.data[0]?.codingAssessments || []); // Updated for handling array structure
    } catch (e) {
      console.error("Error fetching coding assessment data:", e.message);
    } finally {
      setIsLoading(false); // Ensure loading state is updated
    }
  }, []);

  // Fetch assessment data when the component mounts
  useEffect(() => {
    fetchCodingAssessmentData();
  }, [fetchCodingAssessmentData]);

  const languageExtensions = {
    javascript: javascript(),
    java: java(),
    cpp: cpp(),
    go: go(),
    python: python(),
  };

  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "Java", value: "java" },
    { name: "C/C++", value: "cpp" },
    { name: "Go", value: "go" },
    { name: "Python", value: "python" },
  ];

  const submitCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(backendApi.codeTestEvaluator.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          problem: assessmentData[currentQuestionNumber - 1],
        }), // Pass current question data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();
      console.log("Submission response:", dataResponse);
    } catch (error) {
      console.error("Error submitting the code:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-row gap-2 p-4 h-screen w-screen bg-myColor-dark">
      {/* Left Sidebar (problem statement) */}
      <div className="w-[3rem] rounded-lg p-1 bg-myColor-light flex flex-col gap-1">
        {assessmentData?.length > 0 ? (
          assessmentData.map((assessment, index) => (
            <button
              key={index}
              className={`w-[40px] h-[40px] flex justify-center items-center text-white  rounded-lg cursor-pointer hover:bg-myColor-dark
              ${
                currentQuestionNumber - 1 === index
                  ? "bg-myColor-dark"
                  : "bg-myColor-secondary"
              }`}
              onClick={() => setCurrentQuestionNumber(index + 1)} // Updated to set current question
            >
              <p>{index + 1}</p>
            </button>
          ))
        ) : (
          <p className="w-[40px] h-[40px] flex justify-center items-center text-white bg-myColor-secondary rounded-lg cursor-pointer hover:bg-myColor-dark">
            nil
          </p>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-row justify-center items-center gap-2 w-full h-full bg-myColor-dark text-gray-200 overflow-hidden">
        {/* Left Section: Problem Statement */}
        <div
          className="resize-x overflow-auto scrollbar-hide h-full max-w-full flex flex-col gap-2 p-2 bg-myColor-primary rounded-lg border border-myColor-secondary hover:border-myColor-medium"
          style={{
            minWidth: "20rem",
            maxWidth: "70rem",
            flexGrow: 1,
            width: "75rem",
          }}
        >
          <div className="h-full p-4 bg-myColor-dark text-white rounded-lg border border-myColor-secondary">
            <div className="border-b border-b-gray-400">
              <h2 className="text-start font-bold text-2xl mb-2">
                Problem Statement
              </h2>
            </div>

            <div className="flex flex-row border-b border-b-gray-400 py-5 w-full">
              <p className="text-md leading-relaxed break-words whitespace-normal max-w-full">
                {assessmentData?.[currentQuestionNumber - 1]
                  ?.problemStatement || "loading..."}
              </p>
            </div>

            <div className="flex flex-row py-5 w-full">
              <p className="text-md leading-relaxed break-words whitespace-normal max-w-full">
                {assessmentData?.[currentQuestionNumber - 1]?.description ||
                  "Additional details unavailable."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Code Editor and Test Cases */}
        <div
          className="flex flex-col w-full h-full max-w-full gap-2"
          style={{ minWidth: "30rem", maxWidth: "70rem", flexGrow: 2 }}
        >
          {/* Code Editor */}
          <div
            className="resize-y overflow-auto flex flex-col p-4 bg-myColor-primary rounded-lg gap-5 border border-myColor-secondary hover:border-myColor-medium"
            style={{ minHeight: "30%", maxHeight: "80%", height: "50%" }}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-gray-200">
                Code Editor
              </h1>
              <div className="flex flex-row items-center">
                <label className="mr-4 text-gray-300">Language:</label>
                <select
                  className="px-3 py-2 bg-myColor-medium text-myColor-dark rounded-lg focus:outline-none cursor-pointer hover:bg-myColor-light"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map(({ name, value }) => (
                    <option
                      key={value}
                      value={value}
                      className="bg-gray-700 text-gray-200"
                    >
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              className="rounded-lg overflow-scroll custom-scrollbar bg-gray-800 border border-gray-600"
              style={{ height: "85%", width: "100%" }}
            >
              <CodeMirror
                value={code}
                extensions={[
                  languageExtensions[language],
                  keymap.of(defaultKeymap),
                ]}
                theme={oneDark}
                onChange={(value) => setCode(value)}
                height="100%"
                width="100%"
              />
            </div>

            <div className="h-[10%] flex flex-row justify-start items-center gap-5">
              <button className="h-[40px] w-[15%] bg-myColor-secondary text-gray-200 rounded-lg cursor-pointer hover:bg-myColor-accent hover:text-myColor-white">
                Run
              </button>
              <button
                className="h-[40px] w-[15%] bg-myColor-secondary text-gray-200 rounded-lg cursor-pointer hover:bg-myColor-success hover:text-myColor-white"
                onClick={submitCode}
                disabled={isSubmitting} // Disable button during submission
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          {/* Test Cases */}
          <div
      className="w-full bg-myColor-primary rounded-lg px-4  border border-myColor-secondary hover:border-myColor-medium"
      style={{
        flexGrow: 1,
        minHeight: "10rem",
        maxHeight: "50vh",
        height: "20rem",
      }}
    >
      <div className="h-[4rem] flex flex-row justify-between items-center p-1">
        <h2 className="text-gray-200 text-xl font-semibold">
          Test Cases
        </h2>

        {/* Render buttons for selecting test cases */}
        <div className="flex flex-row gap-2">
          {assessmentData?.[currentQuestionNumber - 1]?.testCases?.map(
            (_, index) => (
              <button
                key={index}
                className={`w-[40px] h-[40px] flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-myColor-dark
                  ${CurrentTestCaseNumber - 1 === index
                    ? "bg-myColor-dark"
                    : "bg-myColor-secondary"
                }`}
                onClick={() => setCurrentTestCaseNumber(index + 1)} // Update the current test case number on click
              >
                <p>{index + 1}</p>
              </button>
            )
          )}
        </div>
      </div>

      {/* Render the selected test case */}
      {assessmentData?.[currentQuestionNumber - 1]?.testCases?.length > 0 ? (
        <div className="bg-myColor-dark border border-myColor-secondary text-gray-200 p-4 rounded-lg border my-2">
          <div className="flex flex-row justify-between items-center">
          <h3 className="font-semibold mb-3 ">
            Test Case {CurrentTestCaseNumber}
          </h3>
          <p>Status: {}</p>
          </div>
          
          <div className="overflow-y-auto scrollbar-hide h-[26vh]">
            {/* Inputs Section */}
          <div className="py-3 flex flex-col gap-2">
            <label htmlFor="inputs" className="text-sm font-semibold">
              Inputs
            </label>
            <div className="h-[3rem] flex justify-start items-center rounded-lg bg-myColor-extraLight p-2" id="inputs">
              <pre className="text-myColor-dark text-sm">
                {
                  assessmentData[currentQuestionNumber - 1].testCases[
                    CurrentTestCaseNumber - 1
                  ]?.input
                }
              </pre>
            </div>
          </div>

          {/* Expected Output Section */}
          <div className="py-3 flex flex-col gap-2">
            <label htmlFor="expectedOutput" className="text-sm font-semibold">
              Expected Output
            </label>
            <div className="h-[3rem] flex justify-start items-center rounded-lg bg-myColor-extraLight p-2" id="expectedOutput">
              <pre className="text-myColor-dark text-sm">
                {
                  assessmentData[currentQuestionNumber - 1].testCases[
                    CurrentTestCaseNumber - 1
                  ]?.expectedOutput
                }
              </pre>
            </div>
          </div>

          <div className="py-3 flex flex-col gap-2">
            <label htmlFor="expectedOutput" className="text-sm font-semibold">
              Actual Output
            </label>
            <div className="h-[3rem] flex justify-start items-center rounded-lg bg-myColor-extraLight p-2" id="expectedOutput">
              <pre className="text-myColor-dark text-sm">
                {/* {
                  assessmentData[currentQuestionNumber - 1].testCases[
                    CurrentTestCaseNumber - 1
                  ]?.expectedOutput
                } */} acutal output
              </pre>
            </div>
          </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center py-2">
          No test cases available for this question.
        </p>
      )}
    </div>
    </div>
      </div>
    </div>
  );
};

export default CodingAssessment;
