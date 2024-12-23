import sys
import subprocess
import io
import os
import json

def execute_python_code(code, inputs):
    original_stdout = sys.stdout
    original_stdin = sys.stdin

    # Redirect stdout and stdin
    sys.stdout = output_capture = io.StringIO()
    sys.stdin = io.StringIO(inputs + '\n')  # Ensure input has a newline

    # Define a namespace to execute the code
    namespace = {}

    try:
        # Execute the code in the namespace
        exec(code, namespace)

        # Access the namespace for any execution
        output = output_capture.getvalue()
        return output.strip()
    except Exception as e:
        return f"Python Execution Error: {str(e)}"
    finally:
        sys.stdout = original_stdout
        sys.stdin = original_stdin


def execute_java_code(code, inputs):
    temp_dir = "/tmp"
    java_file_name = os.path.join(temp_dir, "Main.java")
    try:
        with open(java_file_name, "w") as java_file:
            java_file.write(code)

        # Compile Java code
        compile_result = subprocess.run(
            ["javac", java_file_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return f"Java Compilation Error: {compile_result.stderr.strip()}"

        # Execute the compiled Java code
        execute_process = subprocess.run(
            ["java", "-classpath", temp_dir, "Main"],
            input=inputs,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"Java Runtime Error: {execute_process.stderr.strip()}"

        return execute_process.stdout.strip()
    except Exception as e:
        return f"Java Execution Error: {str(e)}"
    finally:
        clean_up(temp_dir, java_file_name)


def execute_cpp_code(code, inputs):
    temp_dir = "/tmp"
    cpp_file_name = os.path.join(temp_dir, "main.cpp")
    binary_name = os.path.join(temp_dir, "main")
    try:
        with open(cpp_file_name, "w") as cpp_file:
            cpp_file.write(code)

        compile_result = subprocess.run(
            ["g++", "-o", binary_name, cpp_file_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return f"C++ Compilation Error: {compile_result.stderr.strip()}"

        execute_process = subprocess.run(
            [binary_name],
            input=inputs,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"C++ Runtime Error: {execute_process.stderr.strip()}"

        return execute_process.stdout.strip()
    except Exception as e:
        return f"C++ Execution Error: {str(e)}"
    finally:
        clean_up(temp_dir, cpp_file_name, binary_name)


def execute_c_code(code, inputs):
    temp_dir = "/tmp"
    c_file_name = os.path.join(temp_dir, "main.c")
    binary_name = os.path.join(temp_dir, "main")
    try:
        with open(c_file_name, "w") as c_file:
            c_file.write(code)

        compile_result = subprocess.run(
            ["gcc", "-o", binary_name, c_file_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return f"C Compilation Error: {compile_result.stderr.strip()}"

        execute_process = subprocess.run(
            [binary_name],
            input=inputs,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"C Runtime Error: {execute_process.stderr.strip()}"

        return execute_process.stdout.strip()
    except Exception as e:
        return f"C Execution Error: {str(e)}"
    finally:
        clean_up(temp_dir, c_file_name, binary_name)


def execute_javascript_code(code, inputs):
    temp_dir = "/tmp"
    js_file_name = os.path.join(temp_dir, "main.js")
    try:
        with open(js_file_name, "w") as js_file:
            js_file.write(code)

        execute_process = subprocess.run(
            ["node", js_file_name],
            input=inputs,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"JavaScript Runtime Error: {execute_process.stderr.strip()}"

        return execute_process.stdout.strip()
    except Exception as e:
        return f"JavaScript Execution Error: {str(e)}"
    finally:
        clean_up(temp_dir, js_file_name)


def execute_csharp_code(code, inputs):
    temp_dir = "/tmp"
    csharp_file_name = os.path.join(temp_dir, "Program.cs")
    executable_file_path = os.path.join(temp_dir, "Program.exe")

    try:
        with open(csharp_file_name, "w") as csharp_file:
            csharp_file.write(code)

        compile_result = subprocess.run(
            ["csc", "-out:" + executable_file_path, csharp_file_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return f"C# Compilation Error: {compile_result.stderr.strip()}"

        if not os.path.exists(executable_file_path):
            return "C# Compilation Error: Executable not generated."

        execute_process = subprocess.run(
            ["mono", executable_file_path],
            input=inputs,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if execute_process.returncode != 0:
            return f"C# Runtime Error: {execute_process.stderr.strip()}"

        return execute_process.stdout.strip()

    except Exception as e:
        return f"C# Execution Error: {str(e)}"
    finally:
        clean_up(temp_dir, csharp_file_name, executable_file_path)


def clean_up(temp_dir, *files):
    for file in files:
        if os.path.exists(file):
            os.remove(file)
    class_files = [f for f in os.listdir(temp_dir) if f.endswith(".class")]
    for file in class_files:
        os.remove(os.path.join(temp_dir, file))


def handler(event, context):
    language = event.get('language', 'python')
    code = event.get('code', '')
    test_cases = event.get('test_cases', [])
    origin = event.get('headers', {}).get('Origin', '*')

    if not code:
        return {
            'StatusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Expose-Headers': 'X-Custom-Header',
            },
            'body': json.dumps({"error": "No code provided."})
        }

    if not test_cases:
        return {
            'StatusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Expose-Headers': 'X-Custom-Header',
            },
            'body': json.dumps({"error": "No test cases provided."})
        }

    results = []

    for test_case in test_cases:
        inputs = test_case.get('input', '')
        try:
            if language == 'python':
                result = execute_python_code(code, inputs)
            elif language == 'java':
                result = execute_java_code(code, inputs)
            elif language == 'c++':
                result = execute_cpp_code(code, inputs)
            elif language == 'c':
                result = execute_c_code(code, inputs)
            elif language == 'javascript':
                result = execute_javascript_code(code, inputs)
            elif language == 'c#':
                result = execute_csharp_code(code, inputs)
            else:
                result = f"Unsupported Language: {language}"
        except Exception as e:
            result = f"Error: {str(e)}"

        results.append({
            'input': inputs,
            'output': result
        })

    return {
        'StatusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Expose-Headers': 'X-Custom-Header',
        },
        'body': json.dumps(results)
    }
