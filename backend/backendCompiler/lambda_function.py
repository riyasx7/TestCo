import sys
import subprocess
import io
import os
import shutil  # For cleaning up directories

def execute_python_code(code):
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()

    try:
        exec(code)
        output = output_capture.getvalue()
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

def execute_java_code(code):
    temp_dir = "/tmp"
    java_file_name = os.path.join(temp_dir, "Main.java")

    try:
        # Write the Java code to a temporary file
        with open(java_file_name, "w") as java_file:
            java_file.write(code)

        # Compile the Java code
        compile_result = subprocess.run(["javac", java_file_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if compile_result.returncode != 0:
            return f"Compilation Error: {compile_result.stderr.decode()}"

        # Execute the compiled Java program
        execute_process = subprocess.run(
            ["java", "-classpath", temp_dir, "Main"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"Runtime Error: {execute_process.stderr.decode()}"

        return execute_process.stdout.decode()

    except Exception as e:
        return str(e)

    finally:
        # Cleanup temporary files
        if os.path.exists(java_file_name):
            os.remove(java_file_name)
        class_files = [f for f in os.listdir(temp_dir) if f.endswith(".class")]
        for file in class_files:
            os.remove(os.path.join(temp_dir, file))

def execute_csharp_code(code):
    temp_dir = "/tmp"
    csharp_file_name = os.path.join(temp_dir, "Program.cs")
    executable_file_path = os.path.join(temp_dir, "Program.exe")

    try:
        # Write the C# code to a temporary file
        with open(csharp_file_name, "w") as csharp_file:
            csharp_file.write(code)

        # Compile the C# code
        compile_result = subprocess.run(
            ["csc", "-out:" + executable_file_path, csharp_file_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return f"Compilation Error: {compile_result.stderr.decode()}"

        # Check if the executable was created
        if not os.path.exists(executable_file_path):
            return "Compilation Error: Executable file not generated"

        # Execute the compiled C# program
        execute_process = subprocess.run(
            ["mono", executable_file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"Runtime Error: {execute_process.stderr.decode()}"

        return execute_process.stdout.decode()

    except Exception as e:
        return str(e)

    finally:
        # Cleanup temporary files
        if os.path.exists(csharp_file_name):
            os.remove(csharp_file_name)
        if os.path.exists(executable_fiawle_path):
            os.remove(executable_file_path)



def execute_javascript_code(code):
    temp_dir = "/tmp"
    js_file_name = os.path.join(temp_dir, "script.js")

    try:
        # Write the JavaScript code to a temporary file
        with open(js_file_name, "w") as js_file:
            js_file.write(code)

        # Execute the JavaScript code using Node.js
        execute_process = subprocess.run(
            ["node", js_file_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"Runtime Error: {execute_process.stderr.decode()}"

        return execute_process.stdout.decode()

    except Exception as e:
        return f"Error: {str(e)}"

    finally:
        # Cleanup temporary files
        if os.path.exists(js_file_name):
            os.remove(js_file_name)



def execute_c_code(code):
    temp_dir = "/tmp"
    c_file_name = os.path.join(temp_dir, "program.c")
    executable_file_name = os.path.join(temp_dir, "program")

    try:
        # Write the C code to a temporary file
        with open(c_file_name, "w") as c_file:
            c_file.write(code)

        # Compile the C code
        compile_result = subprocess.run(["gcc", c_file_name, "-o", executable_file_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if compile_result.returncode != 0:
            return f"Compilation Error: {compile_result.stderr.decode()}"

        # Execute the compiled C program
        execute_process = subprocess.run(
            [executable_file_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"Runtime Error: {execute_process.stderr.decode()}"

        return execute_process.stdout.decode()

    except Exception as e:
        return str(e)

    finally:
        # Cleanup temporary files
        if os.path.exists(c_file_name):
            os.remove(c_file_name)
        if os.path.exists(executable_file_name):
            os.remove(executable_file_name)

def execute_cpp_code(code):
    temp_dir = "/tmp"
    cpp_file_name = os.path.join(temp_dir, "Main.cpp")
    executable_name = os.path.join(temp_dir, "temp")

    try:
        # Write the C++ code to a temporary file
        with open(cpp_file_name, "w") as cpp_file:
            cpp_file.write(code)

        # Compile the C++ code
        compile_result = subprocess.run(
            ["g++", cpp_file_name, "-o", executable_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return f"Compilation Error: {compile_result.stderr.decode()}"

        # Execute the compiled program
        execute_process = subprocess.run(
            [executable_name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if execute_process.returncode != 0:
            return f"Runtime Error: {execute_process.stderr.decode()}"

        return execute_process.stdout.decode()

    except Exception as e:
        return str(e)

    finally:
        # Cleanup temporary files
        if os.path.exists(cpp_file_name):
            os.remove(cpp_file_name)
        if os.path.exists(executable_name):
            os.remove(executable_name)

def handler(event, context):
    language = event.get('language', 'python')
    code = event.get('code', '')
    if language == 'python':
        result = execute_python_code(code)
    elif language == 'java':
        result = execute_java_code(code)
    elif language == 'c++':
        result = execute_cpp_code(code)
    elif language == 'c':
        result = execute_c_code(code)
    elif language == 'javascript':
        result = execute_javascript_code(code)
    elif language == 'c#':
        result = execute_csharp_code(code)
    else:
        result = 'Unsupported Language: ' + language

    return {
        'StatusCode': 200,
        'body': result
    }
