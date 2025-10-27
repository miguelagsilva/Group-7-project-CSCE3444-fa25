from flask import Blueprint, jsonify, request
import json
import os
from datetime import datetime

# Create a Blueprint which will hold all our application's routes
main = Blueprint('main', __name__)

# --- Data Loading Helper ---
def load_data_from_file(filename):
    """A helper function to load data from a specific JSON file."""
    # Corrected path to build from the 'backend' root directory
    data_path = os.path.join('app', 'data', filename)
    try:
        with open(data_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Return an empty list if a file is missing, with a helpful server-side warning
        print(f"Warning: Data file not found at {data_path}")
        return []
    except json.JSONDecodeError:
        # Return an empty list if a file is malformed, with a helpful server-side warning
        print(f"Warning: Could not decode JSON from {data_path}. Check for syntax errors.")
        return []

# --- API Endpoints ---

@main.route('/')
def home():
    """The root endpoint to confirm the server is running."""
    return jsonify({'message': 'Welcome to the Leetcode for Kids API! 🎉'})

@main.route('/modules', methods=['GET'])
def get_modules():
    """
    Endpoint to get the list of all available modules.
    This returns the main overview of each module from modules.json.
    """
    modules = load_data_from_file('modules.json')
    return jsonify(modules)

@main.route('/modules/<int:module_id>', methods=['GET'])
def get_module_by_id(module_id):
    """
    Endpoint to get a single, complete module by its ID.
    This function reads from multiple files and assembles the full module object.
    """
    # Load all the different data sources
    all_modules = load_data_from_file('modules.json')
    learn_data = load_data_from_file('learn.json')
    practice_data = load_data_from_file('practice.json')
    challenge_data = load_data_from_file('challenges.json')
    # Corrected filename to 'quiz.json'
    quizzes_data = load_data_from_file('quiz.json')

    # Find the base module information from modules.json
    module_info = next((m for m in all_modules if m.get('id') == module_id), None)

    if not module_info:
        return jsonify({"error": "Module not found"}), 404

    # Find and attach the related data from the other files
    module_info['learn'] = next((l for l in learn_data if l.get('module_id') == module_id), None)
    module_info['practice'] = next((p for p in practice_data if p.get('module_id') == module_id), None)
    module_info['challenge'] = next((c for c in challenge_data if c.get('module_id') == module_id), None)
    module_info['quizzes'] = [q for q in quizzes_data if q.get('module_id') == module_id]

    return jsonify(module_info)

@main.route('/modules/<int:module_id>/<string:section>', methods=['GET'])
def get_module_section(module_id, section):
    """
    Endpoint to get a specific section (learn, practice, challenge, or quizzes)
    from a specific module.
    """
    valid_sections = {
        'learn': 'learn.json',
        'practice': 'practice.json',
        'challenge': 'challenges.json',
        # Corrected filename to 'quiz.json'
        'quizzes': 'quiz.json'
    }

    if section not in valid_sections:
        return jsonify({"error": f"Invalid section. Please use one of: {', '.join(valid_sections.keys())}"}), 400

    filename = valid_sections[section]
    all_section_data = load_data_from_file(filename)

    if section == 'quizzes':
        data = [item for item in all_section_data if item.get('module_id') == module_id]
    else:
        data = next((item for item in all_section_data if item.get('module_id') == module_id), None)

    if data is not None:
        return jsonify(data)
    else:
        return jsonify({"error": f"No '{section}' data found for module ID {module_id}"}), 404

# --- Quiz Progress Tracking Endpoints ---

@main.route('/quiz-progress', methods=['POST'])
def submit_quiz_progress():
    """
    Endpoint to submit quiz answers and track progress.
    Expects JSON with quiz_id, user_id, answers, and completion_time.
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['quiz_id', 'user_id', 'answers']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        quiz_id = data['quiz_id']
        user_id = data['user_id']
        answers = data['answers']
        completion_time = data.get('completion_time', datetime.now().isoformat())
        
        # Load quiz data to validate answers
        quizzes_data = load_data_from_file('quiz.json')
        quiz = next((q for q in quizzes_data if q.get('quiz_id') == quiz_id), None)
        
        if not quiz:
            return jsonify({"error": "Quiz not found"}), 404
        
        # Calculate score
        total_questions = len(quiz['questions'])
        correct_answers = 0
        
        for question in quiz['questions']:
            question_id = question['question_id']
            correct_answer = question['answer']
            user_answer = answers.get(str(question_id))
            
            if user_answer == correct_answer:
                correct_answers += 1
        
        score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
        
        # Create progress record
        progress_record = {
            'quiz_id': quiz_id,
            'user_id': user_id,
            'score': round(score, 2),
            'correct_answers': correct_answers,
            'total_questions': total_questions,
            'answers': answers,
            'completion_time': completion_time,
            'timestamp': datetime.now().isoformat()
        }
        
        # For now, we'll store in a JSON file (in production, this would be a database)
        progress_file = os.path.join('app', 'data', 'quiz_progress.json')
        
        # Load existing progress
        try:
            with open(progress_file, 'r') as f:
                all_progress = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            all_progress = []
        
        # Add new progress record
        all_progress.append(progress_record)
        
        # Save updated progress
        with open(progress_file, 'w') as f:
            json.dump(all_progress, f, indent=2)
        
        return jsonify({
            'message': 'Quiz progress saved successfully',
            'score': round(score, 2),
            'correct_answers': correct_answers,
            'total_questions': total_questions,
            'progress_id': len(all_progress) - 1
        }), 201
        
    except Exception as e:
        return jsonify({"error": f"Failed to save quiz progress: {str(e)}"}), 500

@main.route('/quiz-progress/<user_id>', methods=['GET'])
def get_user_quiz_progress(user_id):
    """
    Endpoint to get all quiz progress for a specific user.
    """
    try:
        progress_file = os.path.join('app', 'data', 'quiz_progress.json')
        
        # Load progress data
        try:
            with open(progress_file, 'r') as f:
                all_progress = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return jsonify([])
        
        # Filter progress for the specific user
        user_progress = [p for p in all_progress if p.get('user_id') == user_id]
        
        # Add quiz titles for better frontend display
        quizzes_data = load_data_from_file('quiz.json')
        for progress in user_progress:
            quiz = next((q for q in quizzes_data if q.get('quiz_id') == progress['quiz_id']), None)
            if quiz:
                progress['quiz_title'] = quiz['title']
                progress['module_id'] = quiz['module_id']
        
        return jsonify(user_progress)
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve quiz progress: {str(e)}"}), 500

@main.route('/quiz-progress/<user_id>/summary', methods=['GET'])
def get_user_quiz_summary(user_id):
    """
    Endpoint to get a summary of user's quiz performance.
    """
    try:
        progress_file = os.path.join('app', 'data', 'quiz_progress.json')
        
        # Load progress data
        try:
            with open(progress_file, 'r') as f:
                all_progress = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return jsonify({
                'total_quizzes': 0,
                'average_score': 0,
                'total_correct': 0,
                'total_questions': 0,
                'completion_rate': 0
            })
        
        # Filter progress for the specific user
        user_progress = [p for p in all_progress if p.get('user_id') == user_id]
        
        if not user_progress:
            return jsonify({
                'total_quizzes': 0,
                'average_score': 0,
                'total_correct': 0,
                'total_questions': 0,
                'completion_rate': 0
            })
        
        # Calculate summary statistics
        total_quizzes = len(user_progress)
        total_score = sum(p['score'] for p in user_progress)
        average_score = total_score / total_quizzes if total_quizzes > 0 else 0
        
        total_correct = sum(p['correct_answers'] for p in user_progress)
        total_questions = sum(p['total_questions'] for p in user_progress)
        
        # Get total available quizzes for completion rate
        quizzes_data = load_data_from_file('quiz.json')
        total_available_quizzes = len(quizzes_data)
        completion_rate = (total_quizzes / total_available_quizzes) * 100 if total_available_quizzes > 0 else 0
        
        return jsonify({
            'total_quizzes': total_quizzes,
            'average_score': round(average_score, 2),
            'total_correct': total_correct,
            'total_questions': total_questions,
            'completion_rate': round(completion_rate, 2),
            'total_available_quizzes': total_available_quizzes
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve quiz summary: {str(e)}"}), 500

