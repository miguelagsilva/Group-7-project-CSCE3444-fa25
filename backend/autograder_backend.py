from flask import Flask, request, jsonify
import io
import sys
import contextlib

app = Flask(__name__)

# Example test cases — each problem has multiple inputs/outputs
TEST_CASES = {
    "sum_two_numbers": [
        {"input": "1 2\n", "expected": "3\n"},
        {"input": "10 5\n", "expected": "15\n"},
        {"input": "100 200\n", "expected": "300\n"}
    ],
    "reverse_string": [
        {"input": "hello\n", "expected": "olleh\n"},
        {"input": "python\n", "expected": "nohtyp\n"}
    ]
}


@app.route("/api/autograde", methods=["POST"])
def autograde():
    """Run user's Python code and automatically grade it."""
    data = request.get_json()

    code = data.get("code")
    problem_id = data.get("problemId")

    if not code or not problem_id:
        return jsonify({"error": "Missing code or problemId"}), 400

    # Retrieve test cases for the selected problem
    test_cases = TEST_CASES.get(problem_id)
    if not test_cases:
        return jsonify({"error": "Invalid problemId"}), 404

    results = []
    passed_count = 0

    for idx, case in enumerate(test_cases):
        # Redirect stdin and stdout for safe testing
        stdin = io.StringIO(case["input"])
        stdout = io.StringIO()

        try:
            # Execute the user code safely (no file access)
            with contextlib.redirect_stdout(stdout), contextlib.redirect_stdin(stdin):
                exec(code, {})

            output = stdout.getvalue()

            if output == case["expected"]:
                results.append({
                    "test": idx + 1,
                    "status": "passed",
                    "input": case["input"].strip(),
                    "expected": case["expected"].strip(),
                    "output": output.strip()
                })
                passed_count += 1
            else:
                results.append({
                    "test": idx + 1,
                    "status": "failed",
                    "input": case["input"].strip(),
                    "expected": case["expected"].strip(),
                    "output": output.strip()
                })

        except Exception as e:
            results.append({
                "test": idx + 1,
                "status": "error",
                "error": str(e)
            })

    score = (passed_count / len(test_cases)) * 100

    return jsonify({
        "problemId": problem_id,
        "totalTests": len(test_cases),
        "passed": passed_count,
        "score": score,
        "results": results
    })


if __name__ == "__main__":
    app.run(debug=True)
