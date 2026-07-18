# -*- coding: utf-8 -*-
"""
Flask API Server for SLM Agent
Exposes SLM functionality as REST API for Next.js frontend
"""

import sys
import os

# Load environment variables from backend/.env BEFORE importing the agent
# (agent.py reads GEMINI_API_KEY at import time via os.environ)
try:
    from dotenv import load_dotenv
    _env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    load_dotenv(_env_path)
except ImportError:
    pass

# Add slm-agent folder to Python path
script_dir = os.path.dirname(os.path.abspath(__file__))
slm_agent_path = os.path.join(script_dir, 'slm-agent')
sys.path.insert(0, slm_agent_path)
sys.path.insert(0, os.path.join(slm_agent_path, 'tools'))

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Response
import json
import threading
from datetime import datetime

# Import SLM Agent
from agent import SLMAgent
from web_search import search_duckduckgo, batch_search
from job_scraper import aggregate_jobs
from auto_fetcher import get_fetcher

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Initialize SLM Agent (singleton)
agent = None

def get_agent():
    global agent
    if agent is None:
        agent = SLMAgent()
    return agent


# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.route('/', methods=['GET'])
def root():
    """Root endpoint - redirects to frontend or shows status"""
    return jsonify({
        "service": "CurriculumIQ SLM API Server",
        "status": "running",
        "frontend": "http://localhost:3000",
        "endpoints": {
            "health": "/health",
            "analyze": "POST /api/analyze",
            "search": "POST /api/search",
            "jobs": "POST /api/jobs",
            "gapAnalysis": "POST /api/gap-analysis",
            "modelInfo": "GET /api/model-info"
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "slm_ready": get_agent() is not None,
        "timestamp": datetime.now().isoformat()
    })


@app.route('/api/analyze', methods=['POST'])
def analyze_trends():
    """
    Analyze industry trends for a given query

    Request:
        {
            "query": "Artificial Intelligence",
            "save_to_firestore": true
        }

    Response:
        {
            "skills": [...],
            "summary": "...",
            "query": "..."
        }
    """
    try:
        data = request.get_json()
        query = data.get('query', 'AI skills')
        save = data.get('save_to_firestore', True)

        agent = get_agent()
        result = agent.analyze_trends(query)

        if save:
            try:
                agent.save_to_firestore(result, query)
            except Exception as save_err:
                print(f"[WARN] Firestore save failed: {save_err}")

        return jsonify({
            "success": True,
            "data": result,
            "processing_time": result.get('processing_time', 'N/A')
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/search', methods=['POST'])
def search_web():
    """
    Search the web for given query

    Request:
        {
            "query": "AI jobs 2026",
            "max_results": 10
        }
    """
    try:
        data = request.get_json()
        query = data.get('query', '')
        max_results = data.get('max_results', 10)

        results = search_duckduckgo(query, max_results=max_results)

        return jsonify({
            "success": True,
            "results": results,
            "count": len(results)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/jobs', methods=['POST'])
def get_jobs():
    """
    Fetch job postings for a skill

    Request:
        {
            "skill": "Python Developer",
            "platforms": ["linkedin", "naukri", "indeed"],
            "limit": 20
        }
    """
    try:
        data = request.get_json()
        skill = data.get('skill', '')
        platforms = data.get('platforms', ['linkedin'])
        limit = data.get('limit', 20)

        job_data = aggregate_jobs(skill, platforms=platforms, total_limit=limit)

        return jsonify({
            "success": True,
            "data": job_data
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/gap-analysis', methods=['POST'])
def gap_analysis():
    """
    Perform curriculum gap analysis

    Request:
        {
            "query": "Data Science",
            "curriculum_topics": ["Python", "Statistics", "ML", "SQL"]
        }

    Response:
        {
            "coverage_percentage": 75,
            "matched_skills": [...],
            "missing_skills": [...],
            "recommendation": "..."
        }
    """
    try:
        data = request.get_json()
        query = data.get('query', '')
        curriculum_topics = data.get('curriculum_topics', [])

        agent = get_agent()
        result = agent.generate_report(query, curriculum_topics)

        return jsonify({
            "success": True,
            "data": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/batch-analyze', methods=['POST'])
def batch_analyze():
    """
    Analyze multiple queries in batch

    Request:
        {
            "queries": ["AI", "Data Science", "Cloud Computing"]
        }
    """
    try:
        data = request.get_json()
        queries = data.get('queries', [])

        agent = get_agent()
        results = {}

        for query in queries:
            results[query] = agent.analyze_trends(query)

        return jsonify({
            "success": True,
            "data": results,
            "count": len(results)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/stream-analyze', methods=['POST'])
def stream_analyze():
    """
    Stream analysis results in real-time (Server-Sent Events)

    Client receives events like:
        data: {"type": "searching", "message": "Searching web..."}
        data: {"type": "analyzing", "message": "SLM processing..."}
        data: {"type": "result", "data": {...}}
    """
    def generate():
        try:
            data = request.get_json()
            query = data.get('query', '')

            agent = get_agent()

            # Send searching event
            yield f"data: {json.dumps({'type': 'searching', 'message': f'Searching for: {query}'})}\n\n"

            # Perform search
            search_results = agent.search_web(f"{query} skills demand 2026", num_results=8)

            yield f"data: {json.dumps({'type': 'found', 'count': len(search_results), 'message': f'Found {len(search_results)} sources'})}\n\n"

            # Send analyzing event
            yield f"data: {json.dumps({'type': 'analyzing', 'message': 'SLM analyzing data...'})}\n\n"

            # Perform analysis
            result = agent.analyze_trends(query)

            # Send final result
            yield f"data: {json.dumps({'type': 'result', 'data': result})}\n\n"

            yield f"data: {json.dumps({'type': 'done'})}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"

    return Response(generate(), mimetype='text/event-stream')


@app.route('/api/model-info', methods=['GET'])
def model_info():
    """Get SLM model information"""
    agent = get_agent()

    return jsonify({
        "model": "microsoft/Phi-3-mini-4k-instruct",
        "size": "3.8B parameters",
        "mode": "mock" if agent.use_mock else "real",
        "firebase_connected": agent.db is not None,
        "capabilities": [
            "web_search",
            "trend_analysis",
            "job_scraping",
            "gap_analysis",
            "batch_processing"
        ]
    })


@app.route('/api/auto-fetch', methods=['POST'])
def trigger_auto_fetch():
    """
    Trigger manual auto-fetch from all sources
    Returns immediately and runs fetch in background
    """
    try:
        fetcher = get_fetcher()

        # Run in background thread
        thread = threading.Thread(target=fetcher.run_full_fetch)
        thread.start()

        return jsonify({
            "success": True,
            "message": "Auto-fetch started in background",
            "status": "fetching"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/fetch-status', methods=['GET'])
def get_fetch_status():
    """
    Get the last fetch timestamp and status
    """
    try:
        fetcher = get_fetcher()
        status = {
            "is_fetching": fetcher.running if hasattr(fetcher, 'running') else False,
            "interval_minutes": fetcher.interval / 60 if hasattr(fetcher, 'interval') else 30
        }

        # Get last fetch time from Firestore if available
        if fetcher.db:
            last_fetch_doc = fetcher.db.collection('system').document('lastFetch').get()
            if last_fetch_doc.exists:
                data = last_fetch_doc.to_dict()
                status['last_fetch'] = data.get('last_successful_fetch')
                status['total_records'] = data.get('total_records', 0)

        return jsonify(status)
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    print("=" * 60)
    print("CurriculumIQ SLM API Server")
    print("=" * 60)
    print("\nStarting server on http://localhost:5000")
    print("\nAvailable endpoints:")
    print("  POST /api/analyze       - Analyze trends")
    print("  POST /api/search        - Web search")
    print("  POST /api/jobs          - Fetch jobs")
    print("  POST /api/gap-analysis  - Curriculum gap analysis")
    print("  POST /api/stream-analyze - Stream analysis (SSE)")
    print("  GET  /api/model-info    - Model information")
    print("  GET  /health            - Health check")
    print("  POST /api/auto-fetch    - Trigger auto-fetch")
    print("  GET  /api/fetch-status  - Get fetch status")
    print("\n" + "=" * 60)

    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)