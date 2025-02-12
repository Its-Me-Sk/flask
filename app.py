from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='templates')


# Temporary in-memory database
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/add', methods=['POST'])
def add_task():
    data = request.json
    task = {"id": len(tasks) + 1, "task": data["task"]}
    tasks.append(task)
    return jsonify(task), 201

@app.route('/delete/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({"message": "Task deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
