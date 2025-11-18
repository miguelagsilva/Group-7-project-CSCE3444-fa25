from flask import Flask, request, jsonify
import io
import sys
import contextlib
import traceback

app = Flask(__name__)

@app.route("/api/run_code", methods=["POST"])
def run_code():
    """Execute arbitrary Python code safely and return stdout/stderr."""
    data = request.get_json()
    code = data.get("code", "")

    if not code.strip():
        return jsonify({"error": "No code provided"}), 400

    # Capture stdout and stderr
    stdout = io.StringIO()
    stderr = io.StringIO()

    try:
        with contextlib.redirect_stdout(stdout):
            with contextlib.redirect_stderr(stderr):
                # Execute user code in an isolated namespace
                exec(code, {}, {})
    except Exception:
        # Capture traceback if any runtime error
        traceback.print_exc(file=stderr)

    output = stdout.getvalue()
    errors = stderr.getvalue()

    return jsonify({
        "stdout": output,
        "stderr": errors
    })


if __name__ == "__main__":
    app.run(debug=True)
