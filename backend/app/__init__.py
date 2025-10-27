from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

def create_app():
    load_dotenv()  # load environment variables from .env
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret')
    
    # Enable CORS for frontend connections
    CORS(app, origins=['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'])

    # Import routes and register
    from .routes import main
    app.register_blueprint(main)

    return app
