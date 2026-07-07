# -*- coding: utf-8 -*-
"""Test REAL Web Scraping"""
import sys
import os

# Add parent folder to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'tools'))

from web_search import search_duckduckgo

print("=" * 60)
print("TESTING REAL WEB SCRAPING")
print("=" * 60)

# Test 1: DuckDuckGo Search
print("\n[SEARCH] Searching DuckDuckGo for: Python Developer jobs 2026\n")

results = search_duckduckgo("Python Developer jobs 2026", max_results=5)

if results:
    print(f"[OK] FOUND {len(results)} REAL SEARCH RESULTS!\n")
    for i, r in enumerate(results, 1):
        print(f"{i}. Title: {r['title']}")
        print(f"   Source: {r['source']}")
        print(f"   URL: {r['href']}")
        print(f"   Preview: {r['body'][:100]}...\n")
else:
    print("[WARN] No results - DuckDuckGo might be rate limited")
    print("   Try again in a few minutes")

print("=" * 60)
print("WEB SCRAPING TEST COMPLETE")
print("=" * 60)