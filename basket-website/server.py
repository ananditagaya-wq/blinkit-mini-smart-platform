from flask import Flask, request
import csv

app = Flask(__name__)

@app.route("/save-order", methods=["POST"])
def save_order():
    order = request.json
    with open("blinkit_orders.csv", "a", newline="") as f:
        writer = csv.writer(f)
        for item, data in order.items():
            writer.writerow(["Order", item, data["qty"]])
    return "Saved"

app.run(debug=True)
