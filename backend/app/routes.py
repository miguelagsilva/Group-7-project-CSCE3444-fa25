from flask import Blueprint, jsonify
import json
import os

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

