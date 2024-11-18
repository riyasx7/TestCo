import { useEffect, useState, useCallback } from "react";
import backendApi from "../../../../backendAPI/index.js";

const MCQAssessment = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to fetch MCQ assessment data
  const fetchMCQAssessmentData = useCallback(async () => {
    try {
      const response = await fetch(backendApi.mcqAssessmentDataPull.url, {
        method: backendApi.mcqAssessmentDataPull.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const questions = data?.data[0]?.mcqQuestions || [];
      setAssessmentData(questions);

      // Initialize the selectedOptions array with `null` values
      setSelectedOptions(new Array(questions.length).fill(null));
    } catch (e) {
      console.error("Error fetching MCQ assessment data:", e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch assessment data when the component mounts
  useEffect(() => {
    fetchMCQAssessmentData();
  }, [fetchMCQAssessmentData]);

  // Handle option selection
  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions((prev) => {
      const updatedOptions = [...prev]; // Create a shallow copy of the array
      updatedOptions[questionIndex] = optionIndex; // Update the selected option for the given question
      console.log("Updated options:", updatedOptions);
      return updatedOptions; // Return the updated array
    });
  };

  // Submit answers
  const submitAnswers = async () => {
    if (selectedOptions.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(backendApi.mcqAssessmentEvaluation.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: selectedOptions,
          assessmentId: assessmentData[0]?.id || "default-id",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Error submitting answers:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-row gap-2 p-4 h-screen w-screen bg-myColor-dark">
  {/* Left Sidebar (questions navigation) */}
  <div className="w-[3rem] rounded-lg p-1 bg-myColor-light flex flex-col gap-1 overflow-auto scrollbar-hide">
    {assessmentData.length > 0 ? (
      assessmentData.map((_, index) => (
        <button
          key={index}
          className={`w-full flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-myColor-dark ${
            currentQuestionNumber - 1 === index
              ? "bg-myColor-dark"
              : "bg-myColor-secondary"
          }`}
          style={{
            height: `20vh`, // Makes each button take up an equal share of the sidebar's height
            aspectRatio: '1', // Ensures the button is square
          }}
          onClick={() => setCurrentQuestionNumber(index + 1)}
        >
          <p>{index + 1}</p>
        </button>
      ))
    ) : (
      <p className="w-full h-full flex justify-center items-center text-white bg-myColor-secondary rounded-lg cursor-pointer hover:bg-myColor-dark">
        nil
      </p>
    )}
  </div>



      {/* Main Content Area */}
      <div className="flex flex-col justify-center items-center gap-2 w-full h-full bg-myColor-dark text-gray-200 overflow-hidden">
        {isLoading ? (
          <p>Loading...</p> // Add a spinner component for better UX
        ) : assessmentData.length > 0 ? (
          <>
            <div className="flex flex-row justify-center items-center gap-2 w-full h-full">
              {/* Question Section */}
              <div
                className="resize h-full flex flex-col gap-2 p-2 bg-myColor-primary rounded-lg border border-myColor-secondary hover:border-myColor-medium overflow-auto"
                style={{
                  resize: "horizontal",
                  minWidth: "35%",
                  maxWidth: "75%",
                  width: "50%",
                }}
              >
                <div className="h-full p-4 flex flex-col justify-start gap-5 bg-myColor-dark text-white rounded-lg border border-myColor-secondary">
                  <div className="border-b border-b-myColor-medium">
                    <h2 className="text-start text-xl mb-2">
                      Question {currentQuestionNumber}
                    </h2>
                  </div>
                  <div className="overflow-auto scrollbar-hide max-h-[40rem] flex flex-col gap-5">
                    <div className="border-b border-b-myColor-medium w-full py-5">
                      <p className="text-md leading-relaxed break-words whitespace-normal max-w-full">
                        {assessmentData[currentQuestionNumber - 1]?.question ||
                          "Question not available"}
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <div className="border-b border-b-myColor-medium">
                        <h2 className="text-start text-md mb-2">Hint</h2>
                      </div>
                      <p className="text-md leading-relaxed break-words whitespace-normal max-w-full">
                        {assessmentData[currentQuestionNumber - 1]?.hint ||
                          "Hints are not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Options Section */}
              <div className="flex flex-col  h-full min-w-[25%] gap-6 p-2 bg-myColor-primary rounded-lg border border-myColor-secondary hover:border-myColor-medium shadow-lg"
              style={{
                  minWidth: "35%",
                  maxWidth: "75%",
                  width: "50%",
                  flexGrow: 2
                }}>
                <div className="h-full p-4 flex flex-col justify-start gap-5 bg-myColor-dark text-white rounded-lg border border-myColor-secondary">
                  {/* Section Heading */}
                  <h3 className="text-xl  text-gray-200 border-b border-myColor-medium pb-2">
                    Options
                  </h3>

                  <div className="overflow-auto scrollbar-hide max-h-[35rem]">
                    {/* Options List */}
                    <ul className="flex flex-col gap-4">
                      {assessmentData[currentQuestionNumber - 1]?.options.map(
                        (option, index) => (
                          <li key={index} className="w-full">
                            <label
                              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 shadow-md ${
                                selectedOptions[currentQuestionNumber - 1] ===
                                index
                                  ? "bg-myColor-secondary text-myColor-light"
                                  : "bg-myColor-extraLight hover:bg-myColor-secondary text-myColor-dark hover:text-myColor-extraLight"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${currentQuestionNumber}`}
                                value={index}
                                checked={
                                  selectedOptions[currentQuestionNumber - 1] ===
                                  index
                                }
                                onChange={() =>
                                  handleOptionSelect(
                                    currentQuestionNumber - 1,
                                    index
                                  )
                                }
                                className="form-radio h-4 w-4 text-myColor-light bg-myColor-extraLight border-myColor-medium focus:ring-myColor-light"
                              />
                              <span className="text-md leading-relaxed break-words whitespace-normal max-w-[90%] text-lg p-2">
                                {option.option}
                              </span>
                            </label>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-myColor-primary border border-myColor-secondary h-[4rem] w-full rounded-lg flex items-center justify-between gap-4 p-2 shadow-md">
              <div className="bg-myColor-dark w-[10rem] h-[3rem] rounded-lg flex justify-center items-center">
                timer
              </div>
              <div className="flex flex-row gap-2">
                {/* Submit or Finish Button */}
                {currentQuestionNumber > 1 && (
                  <button
                    className="w-[6rem] bg-myColor-secondary flex justify-center items-center text-white px-6 py-2 rounded-md font-medium transition-transform duration-300 transform hover:scale-105 hover:bg-myColor-dark focus:outline-none focus:ring-2 focus:ring-myColor-light shadow-lg"
                    onClick={() =>
                      setCurrentQuestionNumber((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Previous
                  </button>
                )}

                {currentQuestionNumber === assessmentData.length ? (
                  <button
                    className="w-[6rem] bg-myColor-error flex justify-center items-center text-white px-6 py-2 rounded-md font-medium transition-transform duration-300 transform hover:scale-105 hover:bg-myColor-success focus:outline-none  focus:ring-myColor-light shadow-lg"
                    onClick={submitAnswers}
                  >
                    Finish
                  </button>
                ) : (
                  <button
                    className="w-[6rem] bg-myColor-secondary flex justify-center items-center text-white px-6 py-2 rounded-md font-medium transition-transform duration-300 transform hover:scale-105 hover:bg-myColor-dark focus:outline-none focus:ring-2 focus:ring-myColor-light shadow-lg"
                    onClick={() =>
                      setCurrentQuestionNumber((prev) =>
                        Math.min(prev + 1, assessmentData.length)
                      )
                    }
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>No questions available for this assessment.</p>
        )}
      </div>
    </div>
  );
};

export default MCQAssessment;
