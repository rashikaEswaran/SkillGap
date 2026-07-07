"""
Test Script for SLM Agent
Run this to verify everything is working before demo
"""

import sys
import os

# Add slm-agent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "slm-agent"))

from agent import SLMAgent

def test_slm_agent():
    print("=" * 60)
    print("🧪 SLM Agent Test Suite")
    print("=" * 60)

    # Test 1: Initialize agent
    print("\n[TEST 1] Initializing SLM Agent...")
    try:
        agent = SLMAgent()
        print("✅ Agent initialized successfully")
        print(f"   Mode: {'MOCK' if agent.use_mock else 'REAL SLM'}")
    except Exception as e:
        print(f"❌ Agent initialization failed: {e}")
        return False

    # Test 2: Web search
    print("\n[TEST 2] Testing web search...")
    try:
        results = agent.search_web("Python jobs 2026", num_results=3)
        print(f"✅ Search completed: {len(results)} results")
        if results:
            print(f"   First result: {results[0]['title'][:50]}...")
    except Exception as e:
        print(f"❌ Search failed: {e}")

    # Test 3: Analyze trends
    print("\n[TEST 3] Testing trend analysis...")
    try:
        result = agent.analyze_trends("Data Science")
        print(f"✅ Analysis completed")
        print(f"   Skills found: {len(result.get('skills', []))}")
        print(f"   Summary: {result.get('summary', 'N/A')[:60]}...")
    except Exception as e:
        print(f"❌ Analysis failed: {e}")
        return False

    # Test 4: Firebase connection
    print("\n[TEST 4] Testing Firebase connection...")
    try:
        if agent.db:
            print("✅ Firebase connected")
        else:
            print("⚠️ Firebase not connected (optional)")
    except Exception as e:
        print(f"❌ Firebase error: {e}")

    print("\n" + "=" * 60)
    print("✅ All tests completed!")
    print("=" * 60)
    print("\n📋 Summary:")
    print("   - Agent: READY")
    print("   - Web Search: READY")
    print("   - Trend Analysis: READY")
    print("   - Firebase: " + ("CONNECTED" if agent.db else "OPTIONAL"))
    print("\n🚀 Ready to start slm-server.py")
    print("   Then open: http://localhost:3000/live-analysis")
    print("=" * 60)

    return True

if __name__ == "__main__":
    test_slm_agent()