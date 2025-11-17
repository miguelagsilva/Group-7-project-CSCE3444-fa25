from flask import Blueprint, jsonify, request
import json
import os
import re
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

# --- Challenge Test Cases Integration Endpoints ---

@main.route('/challenges/<int:challenge_id>/test-cases', methods=['GET'])
def get_challenge_test_cases(challenge_id):
    """
    Endpoint to get test cases for a specific challenge.
    Returns the test cases that will be used to validate user submissions.
    """
    try:
        # Load challenge data
        challenges_data = load_data_from_file('challenges.json')
        challenge = next((c for c in challenges_data if c.get('id') == challenge_id), None)
        
        if not challenge:
            return jsonify({"error": "Challenge not found"}), 404
        
        # Return test cases (without expected outputs for security)
        test_cases = []
        for test_case in challenge.get('testCases', []):
            test_cases.append({
                'input': test_case.get('input', ''),
                'description': test_case.get('description', '')
            })
        
        return jsonify({
            'challenge_id': challenge_id,
            'title': challenge.get('title', ''),
            'test_cases': test_cases,
            'time_limit': challenge.get('timeLimit', 300)
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve test cases: {str(e)}"}), 500

@main.route('/challenges/<int:challenge_id>/validate', methods=['POST'])
def validate_challenge_submission(challenge_id):
    """
    Endpoint to validate a challenge submission against test cases.
    Expects JSON with user_id, code, and execution_results.
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['user_id', 'code', 'execution_results']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        user_id = data['user_id']
        code = data['code']
        execution_results = data['execution_results']
        
        # Load challenge data
        challenges_data = load_data_from_file('challenges.json')
        challenge = next((c for c in challenges_data if c.get('id') == challenge_id), None)
        
        if not challenge:
            return jsonify({"error": "Challenge not found"}), 404
        
        # Validate against test cases
        test_cases = challenge.get('testCases', [])
        passed_tests = 0
        total_tests = len(test_cases)
        test_results = []
        
        for i, test_case in enumerate(test_cases):
            expected_output = test_case.get('expectedOutput', '')
            actual_output = execution_results.get(f'test_{i}', '')
            
            # Normalize outputs for comparison (remove extra whitespace, newlines)
            expected_normalized = expected_output.strip().replace('\r\n', '\n').replace('\r', '\n')
            actual_normalized = actual_output.strip().replace('\r\n', '\n').replace('\r', '\n')
            
            # Try exact match first
            is_passed = expected_normalized == actual_normalized
            
            # If exact match fails, try flexible validation for educational challenges
            # Check if key information is present (for challenges where format can vary)
            if not is_passed:
                # Extract key words/phrases from expected output
                expected_lower = expected_normalized.lower()
                actual_lower = actual_normalized.lower()
                
                # For introduction challenges, check for key elements
                if 'name' in expected_lower or 'age' in expected_lower or 'hobby' in expected_lower:
                    # Check if user output contains the key information
                    # Must have ALL three elements to pass (stricter validation)
                    has_name = 'name' in actual_lower
                    has_age = 'age' in actual_lower or 'years old' in actual_lower or any(str(i) in actual_lower for i in range(1, 100))
                    has_hobby = 'hobby' in actual_lower or 'love' in actual_lower or 'favorite' in actual_lower
                    
                    # Also check that the output contains actual values (not just keywords)
                    # For Challenge 1, we expect to see the test input values
                    has_actual_values = len(actual_normalized) > 20  # Output should be substantial
                    
                    # If all key elements are present AND output is substantial, consider it passed
                    if has_name and has_age and has_hobby and has_actual_values:
                        is_passed = True
                    else:
                        # Add helpful feedback about what's missing
                        missing_parts = []
                        if not has_name:
                            missing_parts.append('name')
                        if not has_age:
                            missing_parts.append('age')
                        if not has_hobby:
                            missing_parts.append('hobby')
                        if not has_actual_values:
                            missing_parts.append('complete output')
                        
                        # Store feedback in test result for frontend display
                        test_case['missing_parts'] = missing_parts
                
                # For math challenges, check if numbers match
                elif any(op in expected_lower for op in ['sum', 'difference', 'product', 'larger']):
                    # Extract numbers from both outputs
                    expected_nums = set(re.findall(r'\d+', expected_normalized))
                    actual_nums = set(re.findall(r'\d+', actual_normalized))
                    
                    # If key numbers match (like sum, product results), consider passed
                    if expected_nums and actual_nums and len(expected_nums.intersection(actual_nums)) >= 2:
                        is_passed = True
                
                # General flexible check: if output contains most key words from expected
                # This is a fallback for other challenge types - should be stricter
                else:
                    # Only apply flexible validation if output is substantial
                    if len(actual_normalized) < 10:
                        is_passed = False  # Too short, definitely wrong
                    else:
                        # Split into words and check overlap
                        expected_words = set(re.findall(r'\b\w+\b', expected_normalized.lower()))
                        actual_words = set(re.findall(r'\b\w+\b', actual_normalized.lower()))
                        
                        # Remove common words
                        common_words = {'the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'of', 'and', 'or', 'but', 'in', 'on', 'at', 'for', 'with', 'by', 'my', 'i', 'am'}
                        expected_words = expected_words - common_words
                        actual_words = actual_words - common_words
                        
                        # Require 80% similarity AND minimum word count (stricter)
                        if expected_words and actual_words and len(actual_words) >= 3:
                            overlap = len(expected_words.intersection(actual_words))
                            similarity = overlap / len(expected_words) if expected_words else 0
                            if similarity >= 0.8:  # Increased from 0.7 to 0.8
                                is_passed = True
            
            if is_passed:
                passed_tests += 1
            
            test_result = {
                'test_case': i + 1,
                'input': test_case.get('input', ''),
                'expected_output': expected_output,
                'actual_output': actual_output,
                'passed': is_passed
            }
            
            # Add helpful feedback for failed tests
            if not is_passed and 'missing_parts' in test_case:
                test_result['missing_parts'] = test_case.get('missing_parts', [])
            
            test_results.append(test_result)
        
        # Calculate score
        score = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        
        # Create submission record
        submission_record = {
            'challenge_id': challenge_id,
            'user_id': user_id,
            'code': code,
            'score': round(score, 2),
            'passed_tests': passed_tests,
            'total_tests': total_tests,
            'test_results': test_results,
            'timestamp': datetime.now().isoformat()
        }
        
        # Store submission in JSON file (in production, this would be a database)
        submissions_file = os.path.join('app', 'data', 'challenge_submissions.json')
        
        # Load existing submissions
        try:
            with open(submissions_file, 'r') as f:
                all_submissions = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            all_submissions = []
        
        # Add new submission
        all_submissions.append(submission_record)
        
        # Save updated submissions
        with open(submissions_file, 'w') as f:
            json.dump(all_submissions, f, indent=2)
        
        return jsonify({
            'message': 'Challenge submission validated successfully',
            'score': round(score, 2),
            'passed_tests': passed_tests,
            'total_tests': total_tests,
            'test_results': test_results,
            'submission_id': len(all_submissions) - 1
        }), 201
        
    except Exception as e:
        return jsonify({"error": f"Failed to validate challenge submission: {str(e)}"}), 500

@main.route('/challenges/<int:challenge_id>/submissions/<user_id>', methods=['GET'])
def get_user_challenge_submissions(challenge_id, user_id):
    """
    Endpoint to get all submissions for a specific challenge by a specific user.
    """
    try:
        submissions_file = os.path.join('app', 'data', 'challenge_submissions.json')
        
        # Load submissions data
        try:
            with open(submissions_file, 'r') as f:
                all_submissions = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return jsonify([])
        
        # Filter submissions for the specific challenge and user
        user_submissions = [
            s for s in all_submissions 
            if s.get('challenge_id') == challenge_id and s.get('user_id') == user_id
        ]
        
        # Add challenge title for better frontend display
        challenges_data = load_data_from_file('challenges.json')
        challenge = next((c for c in challenges_data if c.get('id') == challenge_id), None)
        if challenge:
            for submission in user_submissions:
                submission['challenge_title'] = challenge['title']
                submission['module_id'] = challenge.get('module_id')
        
        return jsonify(user_submissions)
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve challenge submissions: {str(e)}"}), 500

@main.route('/challenges/<int:challenge_id>/solution', methods=['GET'])
def get_challenge_solution(challenge_id):
    """
    Endpoint to get the solution for a specific challenge.
    This will be used by the Solution Module feature.
    """
    try:
        challenges_data = load_data_from_file('challenges.json')
        challenge = next((c for c in challenges_data if c.get('id') == challenge_id), None)
        
        if not challenge:
            return jsonify({"error": "Challenge not found"}), 404
        
        return jsonify({
            'challenge_id': challenge_id,
            'title': challenge.get('title', ''),
            'solution': challenge.get('solution', ''),
            'explanation': challenge.get('explanation', ''),
            'difficulty': challenge.get('difficulty', 'medium')
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve challenge solution: {str(e)}"}), 500

