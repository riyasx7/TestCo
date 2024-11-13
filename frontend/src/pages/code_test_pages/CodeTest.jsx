import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
// import axios from "axios";
import summaryApi from "../../common/index.js";

const CodeTest = () => {
    const [code, setCode] = useState("# Write your code here");
    const [language, setLanguage] = useState("python");

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

        try {
            // console.log(code);
            // Using fetch for a POST request
            const response = await fetch(summaryApi.codeTestEvaluator.url, {
                method: 'POST', // Set method to POST
                headers: {
                    'Content-Type': 'application/json', // Set Content-Type header
                },
                body: JSON.stringify({ code }), // Send the code as a JSON string
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Handle error response
            }

            const data = await response.json(); // Parse JSON from the response
            console.log(data); // Log the response data
        } catch (error) {
            console.error("There was an error submitting the code:", error); // Log any errors
        }
    };

    return (
        <div className="flex flex-row justify-center items-center px-4 py-0 w-screen h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200">
            {/* Left div (Problem Statement) */}
            <div
                className="resize-x overflow-auto h-[90%] bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-gray-500"
                style={{ minWidth: "35rem", maxWidth: "70rem", width: "60rem" }}
                id="left-section"
            >
                <h2 className="text-start text-gray-200 font-bold text-lg mb-2">Problem Statement</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                    This space can be used for the problem statement, description, etc. Scroll down for more content.
                </p>
                <div className="mt-4 border-t border-gray-600 pt-4">
                    <p className="text-gray-400 text-sm">
                        Additional details about the problem or requirements can go here. You can scroll for more
                        content.
                    </p>
                </div>
            </div>

            {/* Divider between sections */}
            <div className="w-4"></div>

            {/* Right div (Code editor + test cases) */}
            <div
                className="h-[90%] flex flex-col rounded-lg"
                style={{ minWidth: "30rem", maxWidth: "70rem", width: "60rem" }}
                id="right-section"
            >
                {/* Code editor */}
                <div
                    className="resize-y overflow-auto flex flex-col mb-2 p-4 bg-gray-900 rounded-lg gap-5 border border-gray-600 hover:border-gray-500"
                    style={{ minHeight: "20%", height: "50%", flexGrow: 1, flexShrink: 1 }}
                >
                    <div className="flex justify-between items-center ">
                        <h1 className="text-lg font-semibold text-gray-200">Code Editor</h1>
                        <div className="flex items-center">
                            <label className="mr-2 text-gray-300">Language:</label>
                            <select
                                className="px-3 py-2 bg-gray-700 text-gray-200 rounded focus:outline-none cursor-pointer"
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
                            extensions={[languageExtensions[language], keymap.of(defaultKeymap)]}
                            theme={oneDark}
                            onChange={(value) => setCode(value)}
                            height="100%"
                            width="100%"
                        />
                    </div>

                    <div className="h-[10%] flex flex-row justify-start items-center gap-5 ">
                        <button className="h-[40px] w-[15%] bg-gray-600 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-500">
                            Run
                        </button>
                        <button className="h-[40px] w-[15%] bg-gray-600 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-500" onClick={submitCode}>
                            Submit
                        </button>
                    </div>
                </div>

                {/* Divider between Code Editor and Test Cases */}
                <div className="w-4"></div>

                {/* Test cases */}
                <div
                    className="w-full bg-gray-800 rounded-lg p-4 overflow-y-auto border border-gray-600 hover:border-gray-500"
                    style={{ flexGrow: 1, flexShrink: 1, minHeight: "10rem", maxHeight: "50vh" }}
                >
                    <h2 className="text-md font-semibold text-gray-200 mb-2">Test Cases</h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Example test cases will appear here. You can modify this section to show test results, execution
                        status, or other information.
                    </p>
                    <ul className="mt-2 text-sm">
                        <li className="text-gray-400">Test Case 1: Input [1, 2, 3] → Output: [Expected Output]</li>
                        <li className="text-gray-400">Test Case 2: Input [4, 5, 6] → Output: [Expected Output]</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CodeTest;
