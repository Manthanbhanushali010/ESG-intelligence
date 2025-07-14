import os
import sys
# DON'T CHANGE: Add the src directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS

# Import blueprints
from routes.esg import esg_bp

def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='')
    
    # Enable CORS for all routes
    CORS(app, origins="*")
    
    # Register blueprints
    app.register_blueprint(esg_bp)
    
    @app.route('/')
    def serve_frontend():
        """Serve the React frontend"""
        return send_from_directory(app.static_folder, 'index.html')
    
    @app.route('/<path:path>')
    def serve_static_files(path):
        """Serve static files"""
        try:
            return send_from_directory(app.static_folder, path)
        except:
            # If file not found, serve index.html for React routing
            return send_from_directory(app.static_folder, 'index.html')
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)

