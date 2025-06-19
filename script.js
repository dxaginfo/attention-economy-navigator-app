document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const brandForm = document.getElementById('brand-form');
    const resultsSection = document.getElementById('results-section');
    
    // Initialize charts
    initializeCharts();
    
    // Event listeners
    brandForm.addEventListener('submit', function(e) {
        e.preventDefault();
        analyzePresence();
    });
    
    document.getElementById('export-report').addEventListener('click', exportReport);
    document.getElementById('generate-schedule').addEventListener('click', generateSchedule);
    
    // Load platform-specific content for tabs
    loadPlatformData();
});

/**
 * Initialize Chart.js visualizations
 */
function initializeCharts() {
    // Consistency Gauge Chart
    const consistencyGauge = document.getElementById('consistencyGauge');
    if (consistencyGauge) {
        new Chart(consistencyGauge, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [78, 22],
                    backgroundColor: [
                        getGradientColor(78),
                        'rgba(200, 200, 200, 0.2)'
                    ],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Platform Distribution Chart
    const platformChart = document.getElementById('platformDistribution');
    if (platformChart) {
        new Chart(platformChart, {
            type: 'bar',
            data: {
                labels: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'News'],
                datasets: [{
                    label: 'Mentions',
                    data: [65, 48, 72, 18, 25],
                    backgroundColor: [
                        'rgba(29, 161, 242, 0.7)',  // Twitter blue
                        'rgba(66, 103, 178, 0.7)',  // Facebook blue
                        'rgba(193, 53, 132, 0.7)',  // Instagram pink
                        'rgba(0, 119, 181, 0.7)',   // LinkedIn blue
                        'rgba(80, 80, 80, 0.7)'     // News grey
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Mention Count'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Platform'
                        }
                    }
                }
            }
        });
    }
}

/**
 * Analyze brand presence and show results
 */
function analyzePresence() {
    const brandName = document.getElementById('brandName').value;
    const industry = document.getElementById('industry').value;
    
    if (!brandName || industry === 'Select industry') {
        alert('Please enter a brand name and select an industry');
        return;
    }
    
    // Show loading state - in a real app, this would be an API call
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        // Show results section
        resultsSection.style.display = 'block';
        resultsSection.classList.add('show');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update results with brand-specific information
        updateResultsForBrand(brandName, industry);
    }, 1500);
}

/**
 * Show loading state for analysis
 */
function showLoadingState() {
    // In a real implementation, we would show a loading spinner or progress indicator
    document.querySelector('button[type="submit"]').disabled = true;
    document.querySelector('button[type="submit"]').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Analyzing...';
    
    // Reset after timeout
    setTimeout(() => {
        document.querySelector('button[type="submit"]').disabled = false;
        document.querySelector('button[type="submit"]').innerHTML = '<i class="bi bi-search me-2"></i>Analyze Brand Presence';
    }, 1500);
}

/**
 * Update results with brand-specific information
 */
function updateResultsForBrand(brandName, industry) {
    // Update analysis text
    document.querySelector('.consistency-analysis').textContent = `${brandName}'s messaging is mostly consistent across platforms, but there are some variations in tone between social media and news mentions.`;
    
    // Update table with industry-specific messages
    const tableBody = document.getElementById('key-messages-table');
    if (industry === 'sports') {
        tableBody.innerHTML = `
            <tr>
                <td>"Innovation in sports technology"</td>
                <td>High</td>
                <td><span class="badge bg-success">Consistent</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-twitter"></i></span>
                    <span class="badge bg-secondary me-1"><i class="bi bi-linkedin"></i></span>
                    <span class="badge bg-secondary"><i class="bi bi-newspaper"></i></span>
                </td>
            </tr>
            <tr>
                <td>"Fan engagement solutions"</td>
                <td>Medium</td>
                <td><span class="badge bg-warning">Variations</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-instagram"></i></span>
                    <span class="badge bg-secondary me-1"><i class="bi bi-facebook"></i></span>
                </td>
            </tr>
            <tr>
                <td>"Global sports partnership"</td>
                <td>Low</td>
                <td><span class="badge bg-danger">Inconsistent</span></td>
                <td>
                    <span class="badge bg-secondary"><i class="bi bi-newspaper"></i></span>
                </td>
            </tr>
        `;
    } else if (industry === 'technology') {
        tableBody.innerHTML = `
            <tr>
                <td>"Product innovation leader"</td>
                <td>High</td>
                <td><span class="badge bg-success">Consistent</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-linkedin"></i></span>
                    <span class="badge bg-secondary me-1"><i class="bi bi-newspaper"></i></span>
                </td>
            </tr>
            <tr>
                <td>"Customer-focused solutions"</td>
                <td>Medium</td>
                <td><span class="badge bg-warning">Variations</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-twitter"></i></span>
                    <span class="badge bg-secondary me-1"><i class="bi bi-facebook"></i></span>
                </td>
            </tr>
            <tr>
                <td>"Cutting-edge technology"</td>
                <td>High</td>
                <td><span class="badge bg-success">Consistent</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-instagram"></i></span>
                    <span class="badge bg-secondary me-1"><i class="bi bi-facebook"></i></span>
                </td>
            </tr>
        `;
    } else {
        // Generate generic content for other industries
        tableBody.innerHTML = `
            <tr>
                <td>"Industry leadership"</td>
                <td>Medium</td>
                <td><span class="badge bg-success">Consistent</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-linkedin"></i></span>
                    <span class="badge bg-secondary me-1"><i class="bi bi-newspaper"></i></span>
                </td>
            </tr>
            <tr>
                <td>"Customer satisfaction"</td>
                <td>High</td>
                <td><span class="badge bg-warning">Variations</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-twitter"></i></span>
                    <span class="badge bg-secondary me-1"><i class="bi bi-facebook"></i></span>
                </td>
            </tr>
            <tr>
                <td>"Product quality"</td>
                <td>Medium</td>
                <td><span class="badge bg-success">Consistent</span></td>
                <td>
                    <span class="badge bg-secondary me-1"><i class="bi bi-instagram"></i></span>
                </td>
            </tr>
        `;
    }
}

/**
 * Load platform-specific content for tabs
 */
function loadPlatformData() {
    // In a real implementation, this would fetch data from an API
    
    // Facebook content
    setTimeout(() => {
        document.querySelector('#facebook .platform-insights').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Message Tone</h6>
                    <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 40%">Professional (40%)</div>
                    </div>
                    <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 45%">Casual (45%)</div>
                    </div>
                    <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-warning" role="progressbar" style="width: 15%">Promotional (15%)</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <h6>Key Recommendations</h6>
                    <ul class="list-group">
                        <li class="list-group-item">Balance casual and professional tones</li>
                        <li class="list-group-item">Increase use of video content</li>
                        <li class="list-group-item">Encourage more community interactions</li>
                    </ul>
                </div>
            </div>
        `;
    }, 1000);
    
    // Instagram content
    setTimeout(() => {
        document.querySelector('#instagram .platform-insights').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Message Tone</h6>
                    <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 25%">Professional (25%)</div>
                    </div>
                    <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 55%">Casual (55%)</div>
                    </div>
                    <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-warning" role="progressbar" style="width: 20%">Promotional (20%)</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <h6>Key Recommendations</h6>
                    <ul class="list-group">
                        <li class="list-group-item">Maintain casual, engaging tone</li>
                        <li class="list-group-item">Use more story highlights for key messages</li>
                        <li class="list-group-item">Increase consistency in visual branding</li>
                    </ul>
                </div>
            </div>
        `;
    }, 1500);
}

/**
 * Export the analysis report
 */
function exportReport() {
    alert("Report export functionality would be implemented here. In a real application, this would generate a PDF or Excel report of the analysis.");
}

/**
 * Generate an optimized content schedule
 */
function generateSchedule() {
    const generateBtn = document.getElementById('generate-schedule');
    generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...';
    
    setTimeout(() => {
        generateBtn.innerHTML = '<i class="bi bi-calendar-plus me-1"></i>Generate Optimal Schedule';
        alert("In a full implementation, this would create a customized content schedule based on your audience engagement patterns and platform-specific analytics.");
    }, 1500);
}

/**
 * Helper function to get gradient color based on score
 */
function getGradientColor(score) {
    if (score >= 80) {
        return '#198754'; // green
    } else if (score >= 60) {
        return '#0d6efd'; // blue
    } else if (score >= 40) {
        return '#fd7e14'; // orange
    } else {
        return '#dc3545'; // red
    }
}