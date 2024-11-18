const { spawn } = require('child_process');

async function codingAssessmentPython(req, res) {
    try {
        // Ensure the body has a code and problem data
        if (!req.body || !req.body.code || !req.body.problem) {
            return res.status(400).json({
                message: "No code or problem data provided!",
                error: true,
                success: false,
            });
        }

        // Problem data sent from the frontend
        const { problem, code } = req.body;

        console.log(req.body);

        // Extract problem data (problem statement, inputs, test cases, etc.)
        const { problemStatement, inputs, testCases } = problem;

        // Generate the dynamic driver code based on the problem data
        let driverCode = `
def driver_code():
    try:
        # Input handling dynamically based on the problem statement
        inputs = ${JSON.stringify(inputs)};
        
        # Take the inputs from the user
        user_inputs = []
        for input_type in inputs:
            user_input = input(f"Enter {input_type}: ")
            user_inputs.append(user_input)

        # Call the user-defined function to process the inputs
        result = user_function(*user_inputs)  # Assuming user_function is the function to be defined by the user
        print(f"Result: {result}")
        
    except Exception as e:
        print(f"Error: {str(e)}")

# Call the driver code
driver_code()
`;

        // Combine the user-submitted code with the driver code
        const pythonCode = driverCode + '\n' + code;

        // Choose the correct Python executable (python or python3)
        const pythonExecutable = process.platform === 'win32' ? 'python' : 'python3';

        // Spawn a new Python process
        const pythonProcess = spawn(pythonExecutable, ['-c', pythonCode]);

        // Capture the output of the Python script
        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
            console.log("Raw data from Python script:", data.toString());
        });

        // Capture any errors from the Python script
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python error: ${data.toString()}`);
        });

        // Handle process exit and send the response
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Success: Send the result back to the client
                res.status(200).json({
                    message: "Code executed successfully!",
                    result: result,
                    error: false,
                    success: true,
                });
            } else {
                // Error: Handle execution failure
                res.status(500).json({
                    message: `Error executing Python code with exit code ${code}`,
                    error: true,
                    success: false,
                });
            }
        });

        // Handle process error (e.g., failed to spawn the process)
        pythonProcess.on('error', (err) => {
            console.error(`Error spawning Python process: ${err.message}`);
            res.status(500).json({
                message: `Error spawning Python process: ${err.message}`,
                error: true,
                success: false,
            });
        });

    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({
            message: e.message || "Something went wrong!",
            error: true,
            success: false,
        });
    }
}

module.exports = codingAssessmentPython;
