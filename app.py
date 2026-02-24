from flask import Flask, request, jsonify

app = Flask(__name__)

scores = []

@app.route("/save_score", methods=["POST"])
def save_score():
    data = request.json
    scores.append(data["score"])
    return jsonify({"status": "ok"})

@app.route("/scores")
def get_scores():
    return jsonify(scores)

if __name__ == "__main__":
    app.run(debug=True)
