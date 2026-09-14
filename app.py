from flask import Flask, jsonify, render_template, request

from llm_call import generate_response

app = Flask(__name__)


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/api/chat")
def chat():
    data = request.get_json(silent=True) or {}
    prompt = str(data.get("prompt", "")).strip()

    if not prompt:
        return jsonify({"error": "Please enter a message."}), 400

    try:
        return jsonify({"response": generate_response(prompt)})
    except Exception:
        app.logger.exception("Gemini request failed")
        return jsonify({"error": "The assistant could not respond right now."}), 502


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)