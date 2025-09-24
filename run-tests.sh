#!/bin/bash

# B.A.T.S. Tool Test Suite Runner
echo "=================================="
echo "B.A.T.S. Tool Test Simulation Suite"
echo "=================================="
echo ""
echo "This script will run comprehensive tests on the B.A.T.S. tool"
echo "to identify potential bugs and areas for improvement."
echo ""

# Check if test file exists
if [ ! -f "test-simulation.html" ]; then
    echo "Error: test-simulation.html not found!"
    exit 1
fi

# Try to open in default browser
if command -v xdg-open > /dev/null; then
    echo "Opening test suite in browser..."
    xdg-open test-simulation.html
elif command -v open > /dev/null; then
    echo "Opening test suite in browser..."
    open test-simulation.html
elif command -v start > /dev/null; then
    echo "Opening test suite in browser..."
    start test-simulation.html
else
    echo "Please open test-simulation.html in your browser manually."
fi

echo ""
echo "TEST INSTRUCTIONS:"
echo "=================="
echo "1. The test suite will open in your browser"
echo "2. Click 'Run Simulations' to start the 1000 test scenarios"
echo "3. Tests will check:"
echo "   - Victim creation (1-10 victims)"
echo "   - Transaction handling (1-20 transactions per victim)"
echo "   - Hop operations (1-40 hops)"
echo "   - Thread allocation and management"
echo "   - Commingling and splitting scenarios"
echo "   - Currency swaps and conversions"
echo "   - Terminal wallet detection"
echo "   - Validation rules"
echo ""
echo "4. Results will show:"
echo "   - Pass/fail rates"
echo "   - Issues by category"
echo "   - Performance metrics"
echo "   - Critical errors"
echo ""
echo "5. Click 'Export Results' to save detailed test data"
echo ""
echo "Expected test areas that may reveal bugs:"
echo "   • Thread over-allocation in complex commingling"
echo "   • Swap currency conversion accuracy"
echo "   • Terminal wallet index consistency"
echo "   • Hop completion validation"
echo "   • Graph generation with 40+ hops"
echo "   • Report generation with mixed currencies"
echo "   • Edit operations on completed hops"
echo ""
echo "Press Enter to continue after reviewing the test results..."
read