const { spawn } = require('child_process');

async function testEvaluator(req, res) {
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

        // Spawn a new Python process
        const pythonProcess = spawn('python3', ['-c', pythonCode]); // or 'python' if it's available


        // Capture the output of the Python script
        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
            console.log("raw data ",data);

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
                    message: "Error executing Python code!",
                    error: true,
                    success: false,
                });
            }
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

module.exports = testEvaluator;
