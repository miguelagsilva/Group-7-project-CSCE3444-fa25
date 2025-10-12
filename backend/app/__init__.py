from flask import Flask
import os
from dotenv import load_dotenv

def create_app():
    load_dotenv()  # load environment variables from .env
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret')

    # Import routes and register
    from .routes import main
    app.register_blueprint(main)

    return app
