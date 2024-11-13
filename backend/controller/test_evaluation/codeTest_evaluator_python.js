const { spawn } = require('child_process');

async function codeTest_evaluator_python(req, res) {
    try {
        // Ensure the body has a code property
        if (!req.body || !req.body.code) {
            return res.status(400).json({
                message: "No code provided!",
                error: true,
                success: false,
            });
        }

        // Python code received from the request body
        const pythonCode = req.body.code;

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

module.exports = codeTest_evaluator_python;
