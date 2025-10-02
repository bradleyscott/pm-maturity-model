const fs = require('fs');
const path = require('path');
const icons = require('./icons');

/**
 * Generate HTML files from extracted JSON data
 */

function generateModelHTML(data) {
  const levels = data.levels || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PM Maturity Model - The Model</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .collapsible { cursor: pointer; }
        .level-content { display: none; }
        .level-content.active { display: block; }
        .practice-content { display: none; }
        .practice-content.active { display: block; }
    </style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-6 py-6">
                <h1 class="text-4xl font-bold text-gray-900">Product Management Maturity Model</h1>
                <p class="text-lg text-gray-600 mt-2">A practice-based framework for B2B/Enterprise product teams to assess and improve their capabilities</p>
            </div>
        </header>

        <main class="max-w-6xl mx-auto p-6 bg-white">
            <div class="mb-8">
                <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p class="text-sm text-gray-700">
                        <strong>How to use this model:</strong> This is designed for team self-assessment.
                        Practices build cumulatively—Level 2 assumes Level 1 is in place, Level 3 assumes both prior levels.
                        Teams may have mixed maturity across practices. AI acceleration is marked with ✨ where applicable.
                    </p>
                </div>
            </div>

            <div class="space-y-6" id="levels-container"></div>

            <div class="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">About This Model</h3>
                <div class="space-y-3 text-sm text-gray-700">
                    <p>
                        This model synthesizes best practices from leading product thinkers including Marty Cagan (SVPG),
                        Teresa Torres, Ravi Mehta, Melissa Perri, Lenny Rachitsky, and others, tailored for
                        B2B/B2E enterprise software product teams.
                    </p>
                    <p>
                        <strong>Designed for:</strong> Self-assessment and improvement planning by cross-functional
                        product teams including PMs, Product Owners, UX, and Engineering Leadership.
                    </p>
                    <p>
                        <strong>Assessment approach:</strong> Teams should honestly evaluate whether they consistently
                        meet all criteria for a practice. Occasional execution doesn't count—practices should be
                        established, reliable, and habitual.
                    </p>
                    <p>
                        <strong>AI dimension:</strong> AI acceleration is marked where LLMs and AI tools can realistically
                        make practices faster, cheaper, or higher quality. This is about accelerating product management
                        work itself, not about building AI products.
                    </p>
                </div>
            </div>
        </main>

        <footer class="bg-white border-t border-gray-200 mt-12">
            <div class="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600 text-sm">
                <p>Product Management Maturity Model | Built for B2B/Enterprise Product Teams</p>
                <p class="mt-2"><a href="index.html" class="text-purple-600 hover:text-purple-800">← Back to Home</a></p>
            </div>
        </footer>
    </div>

    <script>
        const levels = ${JSON.stringify(levels, null, 8)};

        // State management
        const state = {
            expandedLevels: {
                level1: true,
                level2: false,
                level3: false
            },
            expandedPractices: {}
        };

        function toggleLevel(levelId) {
            state.expandedLevels[levelId] = !state.expandedLevels[levelId];
            render();
        }

        function togglePractice(practiceId) {
            state.expandedPractices[practiceId] = !state.expandedPractices[practiceId];
            renderPractice(practiceId);
        }

        function renderPractice(practiceId) {
            const content = document.getElementById(\`practice-\${practiceId}\`);
            const icon = document.getElementById(\`icon-\${practiceId}\`);

            if (state.expandedPractices[practiceId]) {
                content.classList.add('active');
                icon.innerHTML = '▼';
            } else {
                content.classList.remove('active');
                icon.innerHTML = '▶';
            }
        }

        function render() {
            const container = document.getElementById('levels-container');
            container.innerHTML = '';

            levels.forEach(level => {
                const isExpanded = state.expandedLevels[level.id];

                const levelDiv = document.createElement('div');
                levelDiv.className = \`border-2 rounded-lg \${level.color}\`;

                levelDiv.innerHTML = \`
                    <div class="\${level.headerColor} p-4 rounded-t-lg cursor-pointer flex items-center justify-between" onclick="toggleLevel('\${level.id}')">
                        <h2 class="text-2xl font-bold text-gray-900">\${level.name}</h2>
                        <span class="text-2xl">\${isExpanded ? '▼' : '▶'}</span>
                    </div>

                    <div class="level-content \${isExpanded ? 'active' : ''} p-6 space-y-6">
                        <div>
                            <h3 class="font-semibold text-gray-900 mb-2">\${level.description}</h3>
                            <p class="text-gray-700 mb-3">\${level.context}</p>
                            <p class="text-gray-700 italic bg-white bg-opacity-60 p-3 rounded">\${level.value}</p>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-xl font-semibold text-gray-900">Practices</h3>
                            \${level.practices.map(practice => \`
                                <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div class="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50" onclick="togglePractice('\${practice.id}')">
                                        <div class="flex items-center gap-3">
                                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                                            </svg>
                                            <h4 class="font-semibold text-gray-900">\${practice.name}</h4>
                                            \${practice.ai && practice.ai.enabled ? '<span class="text-purple-500" title="AI Acceleration Available">✨</span>' : ''}
                                        </div>
                                        <span id="icon-\${practice.id}" class="text-xl">▶</span>
                                    </div>

                                    <div id="practice-\${practice.id}" class="practice-content p-4 pt-0 space-y-4">
                                        <div>
                                            <p class="text-sm font-semibold text-gray-700 mb-2">Pass Criteria:</p>
                                            <ul class="space-y-2">
                                                \${practice.criteria.map(criterion => \`
                                                    <li class="flex items-start gap-2 text-sm text-gray-700">
                                                        <svg class="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <span>\${criterion}</span>
                                                    </li>
                                                \`).join('')}
                                            </ul>
                                        </div>

                                        \${practice.ai && practice.ai.enabled && practice.ai.examples && practice.ai.examples.length > 0 ? \`
                                            <div class="bg-purple-50 p-3 rounded border border-purple-200">
                                                <div class="flex items-center gap-2 mb-2">
                                                    <span class="text-purple-600">✨</span>
                                                    <p class="text-sm font-semibold text-purple-900">AI Acceleration Opportunities:</p>
                                                </div>
                                                <ul class="space-y-1">
                                                    \${practice.ai.examples.map(example => \`
                                                        <li class="text-sm text-purple-900 ml-6">• \${example}</li>
                                                    \`).join('')}
                                                </ul>
                                            </div>
                                        \` : ''}
                                    </div>
                                </div>
                            \`).join('')}
                        </div>
                    </div>
                \`;

                container.appendChild(levelDiv);
            });
        }

        // Initial render
        document.addEventListener('DOMContentLoaded', render);
    </script>
</body>
</html>`;
}

function generateAssessmentHTML(data) {
  const practices = data.practices || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PM Maturity Model - Self-Assessment</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-6 py-6">
                <h1 class="text-3xl font-bold text-gray-900">Product Management Maturity Self-Assessment</h1>
            </div>
        </header>

        <main class="max-w-6xl mx-auto p-6 bg-white">
            <div class="mb-6">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                        <input type="text" id="teamName" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your team name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Assessment Date</label>
                        <input type="date" id="assessmentDate" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                    </div>
                </div>

                <div class="flex gap-3 mb-6">
                    <button onclick="exportAssessment()" class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        <span>📥</span> Export Assessment
                    </button>
                    <button onclick="resetAssessment()" class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        <span>🔄</span> Reset All
                    </button>
                </div>

                <!-- Progress Summary -->
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="p-4 rounded-lg border-2 bg-amber-50 border-amber-200">
                        <h3 class="font-semibold text-gray-900 mb-2">Level 1 Progress</h3>
                        <div id="level1-progress" class="text-3xl font-bold text-gray-900 mb-1">0%</div>
                        <div id="level1-detail" class="text-sm text-gray-600">0 of 5 established</div>
                    </div>
                    <div class="p-4 rounded-lg border-2 bg-blue-50 border-blue-200">
                        <h3 class="font-semibold text-gray-900 mb-2">Level 2 Progress</h3>
                        <div id="level2-progress" class="text-3xl font-bold text-gray-900 mb-1">0%</div>
                        <div id="level2-detail" class="text-sm text-gray-600">0 of 5 established</div>
                    </div>
                    <div class="p-4 rounded-lg border-2 bg-purple-50 border-purple-200">
                        <h3 class="font-semibold text-gray-900 mb-2">Level 3 Progress</h3>
                        <div id="level3-progress" class="text-3xl font-bold text-gray-900 mb-1">0%</div>
                        <div id="level3-detail" class="text-sm text-gray-600">0 of 5 established</div>
                    </div>
                </div>

                <!-- Priority Practices Summary -->
                <div id="priority-summary" class="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-6" style="display: none;">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-orange-600 text-xl">⚠️</span>
                        <h3 class="font-semibold text-gray-900">Priority Practices (<span id="priority-count">0</span>)</h3>
                    </div>
                    <div id="priority-list" class="text-sm text-gray-700"></div>
                </div>
            </div>

            <!-- Assessment Tables Container -->
            <div class="space-y-6" id="assessment-container"></div>

            <div class="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">How to Use This Assessment</h3>
                <div class="space-y-2 text-sm text-gray-700">
                    <p><strong>Status:</strong></p>
                    <ul class="list-disc ml-6 space-y-1">
                        <li><strong>Not Started:</strong> This practice doesn't exist or is rarely done</li>
                        <li><strong>In Progress:</strong> You're working on establishing this practice, it's inconsistent</li>
                        <li><strong>Established:</strong> This practice is consistent, reliable, and embedded in how you work</li>
                    </ul>
                    <p class="mt-3"><strong>AI Enabled:</strong> Check if you're using AI tools to accelerate this practice</p>
                    <p><strong>Priority:</strong> Mark practices you want to focus on improving in the next quarter</p>
                    <p class="mt-3"><strong>Tip:</strong> Be honest! This is for your team's benefit. Aspirational assessment won't help you improve.</p>
                </div>
            </div>
        </main>

        <footer class="bg-white border-t border-gray-200 mt-12">
            <div class="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600 text-sm">
                <p>Product Management Maturity Model | Built for B2B/Enterprise Product Teams</p>
                <p class="mt-2"><a href="index.html" class="text-purple-600 hover:text-purple-800">← Back to Home</a></p>
            </div>
        </footer>
    </div>

    <script>
        const practices = ${JSON.stringify(practices, null, 8)};

        // Initialize assessment state
        const assessment = {};
        practices.forEach(practice => {
            assessment[practice.id] = {
                status: 'not-started',
                aiEnabled: false,
                priority: false,
                notes: ''
            };
        });

        function getLevelColor(level) {
            switch(level) {
                case 1: return 'bg-amber-50 border-amber-200';
                case 2: return 'bg-blue-50 border-blue-200';
                case 3: return 'bg-purple-50 border-purple-200';
            }
        }

        function getStatusIcon(status) {
            switch(status) {
                case 'established': return '<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
                case 'in-progress': return '<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>';
                default: return '<svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"></circle></svg>';
            }
        }

        function updatePractice(practiceId, field, value) {
            assessment[practiceId][field] = value;
            updateProgress();
            updatePrioritySummary();
        }

        function updateProgress() {
            for (let level = 1; level <= 3; level++) {
                const levelPractices = practices.filter(p => p.level === level);
                const established = levelPractices.filter(p => assessment[p.id].status === 'established').length;
                const inProgress = levelPractices.filter(p => assessment[p.id].status === 'in-progress').length;
                const total = levelPractices.length;
                const percentage = Math.round((established / total) * 100);

                document.getElementById(\`level\${level}-progress\`).textContent = percentage + '%';
                document.getElementById(\`level\${level}-detail\`).innerHTML = \`\${established} of \${total} established\` +
                    (inProgress > 0 ? \`<span class="block">(\${inProgress} in progress)</span>\` : '');
            }
        }

        function updatePrioritySummary() {
            const priorities = practices.filter(p => assessment[p.id].priority);
            const summaryDiv = document.getElementById('priority-summary');

            if (priorities.length > 0) {
                summaryDiv.style.display = 'block';
                document.getElementById('priority-count').textContent = priorities.length;
                document.getElementById('priority-list').textContent = priorities.map(p => p.name).join(', ');
            } else {
                summaryDiv.style.display = 'none';
            }
        }

        function renderAssessment() {
            const container = document.getElementById('assessment-container');
            container.innerHTML = '';

            for (let level = 1; level <= 3; level++) {
                const levelPractices = practices.filter(p => p.level === level);

                const levelDiv = document.createElement('div');
                levelDiv.className = \`border-2 rounded-lg \${getLevelColor(level)}\`;
                levelDiv.innerHTML = \`
                    <div class="p-4 border-b-2 border-gray-200">
                        <h2 class="text-xl font-bold text-gray-900">Level \${level}: \${levelPractices[0].levelName}</h2>
                    </div>
                    <div class="p-4">
                        <div class="overflow-x-auto">
                            <table class="w-full bg-white">
                                <thead>
                                    <tr class="border-b-2 border-gray-200">
                                        <th class="text-left p-3 font-semibold text-gray-700">Practice</th>
                                        <th class="text-center p-3 font-semibold text-gray-700 w-32">Status</th>
                                        <th class="text-center p-3 font-semibold text-gray-700 w-24">AI</th>
                                        <th class="text-center p-3 font-semibold text-gray-700 w-24">Priority</th>
                                        <th class="text-left p-3 font-semibold text-gray-700 w-64">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    \${levelPractices.map(practice => \`
                                        <tr class="border-b border-gray-200">
                                            <td class="p-3">
                                                <div class="flex items-center gap-2">
                                                    <span id="icon-\${practice.id}">\${getStatusIcon(assessment[practice.id].status)}</span>
                                                    <span class="font-medium text-gray-900">\${practice.name}</span>
                                                </div>
                                            </td>
                                            <td class="p-3">
                                                <select
                                                    id="status-\${practice.id}"
                                                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                    onchange="updatePractice('\${practice.id}', 'status', this.value); document.getElementById('icon-\${practice.id}').innerHTML = getStatusIcon(this.value);"
                                                >
                                                    <option value="not-started">Not Started</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="established">Established</option>
                                                </select>
                                            </td>
                                            <td class="p-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    id="ai-\${practice.id}"
                                                    class="w-5 h-5 rounded"
                                                    onchange="updatePractice('\${practice.id}', 'aiEnabled', this.checked)"
                                                />
                                            </td>
                                            <td class="p-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    id="priority-\${practice.id}"
                                                    class="w-5 h-5 rounded"
                                                    onchange="updatePractice('\${practice.id}', 'priority', this.checked)"
                                                />
                                            </td>
                                            <td class="p-3">
                                                <input
                                                    type="text"
                                                    id="notes-\${practice.id}"
                                                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                    placeholder="Add notes..."
                                                    onchange="updatePractice('\${practice.id}', 'notes', this.value)"
                                                />
                                            </td>
                                        </tr>
                                    \`).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                \`;
                container.appendChild(levelDiv);
            }
        }

        function exportAssessment() {
            const teamName = document.getElementById('teamName').value || 'Not specified';
            const date = document.getElementById('assessmentDate').value;
            let text = \`Product Management Maturity Assessment\\n\`;
            text += \`Team: \${teamName}\\n\`;
            text += \`Date: \${date}\\n\\n\`;
            text += '='.repeat(60) + '\\n\\n';

            practices.forEach(practice => {
                const data = assessment[practice.id];
                if (data.status !== 'not-started' || data.notes) {
                    text += \`\${practice.name} (\${practice.levelName})\\n\`;
                    text += \`Status: \${data.status.replace('-', ' ').toUpperCase()}\\n\`;
                    text += \`AI Enabled: \${data.aiEnabled ? 'Yes' : 'No'}\\n\`;
                    text += \`Priority: \${data.priority ? 'Yes' : 'No'}\\n\`;
                    if (data.notes) {
                        text += \`Notes: \${data.notes}\\n\`;
                    }
                    text += \`\\n\`;
                }
            });

            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`pm-maturity-assessment-\${date}.txt\`;
            a.click();
            URL.revokeObjectURL(url);
        }

        function resetAssessment() {
            if (confirm('Are you sure you want to reset all assessments?')) {
                practices.forEach(practice => {
                    assessment[practice.id] = {
                        status: 'not-started',
                        aiEnabled: false,
                        priority: false,
                        notes: ''
                    };
                });
                document.getElementById('teamName').value = '';
                document.getElementById('assessmentDate').valueAsDate = new Date();
                renderAssessment();
                updateProgress();
                updatePrioritySummary();
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('assessmentDate').valueAsDate = new Date();
            renderAssessment();
            updateProgress();
        });
    </script>
</body>
</html>`;
}

function generateGuideHTML(data) {
  const levels = data.levels || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Getting Started Guide - PM Maturity Model</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .section-content {
            display: none;
        }
        .section-content.expanded {
            display: block;
        }
    </style>
</head>
<body class="bg-white">
    <div class="max-w-6xl mx-auto p-6 bg-white">
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
                Getting Started Guide
            </h1>
            <p class="text-lg text-gray-600 mb-4">
                Practical advice for teams at each maturity level
            </p>
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p class="text-sm text-gray-700">
                    <strong>Using this guide:</strong> Find your current level, focus on establishing those practices solidly before moving up.
                    Maturity isn't a race—it's about building sustainable, high-impact practices. Most teams spend 6-12 months at each level.
                </p>
            </div>
        </div>

        <div class="space-y-6" id="levels-container"></div>

        <div class="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">General Principles for Success</h3>
            <div class="space-y-3 text-sm text-gray-700">
                <p><strong>🎯 Focus beats breadth:</strong> Better to establish 2-3 practices really well than do 10 things poorly.</p>
                <p><strong>👥 Involve the team:</strong> Co-create practices with engineering and UX. Imposed processes fail.</p>
                <p><strong>📊 Make progress visible:</strong> Track and celebrate improvements. Teams need to see they're getting better.</p>
                <p><strong>🔄 Iterate on practices:</strong> Your first template/process won't be perfect. Adjust based on what works.</p>
                <p><strong>⏱️ Be patient:</strong> Real maturity takes time. Most teams spend 6-12 months solidifying each level.</p>
                <p><strong>🤝 Get executive sponsorship:</strong> Leadership support makes everything easier. Show them the business value.</p>
                <p><strong>🚀 Start now:</strong> Don't wait for perfect conditions. Start with one practice this week.</p>
            </div>
        </div>
    </div>

    <script>
        const levels = ${JSON.stringify(levels, null, 8)};

        // State management
        const state = {
            expandedSections: {
                level1: true,
                level2: false,
                level3: false
            }
        };

        function toggleSection(sectionId) {
            state.expandedSections[sectionId] = !state.expandedSections[sectionId];
            renderLevels();
        }

        function renderList(items, className = '') {
            return items.map(item => \`
                <li class="flex items-start gap-2 text-gray-700 \${className}">
                    <span class="text-blue-600 font-bold mt-1">→</span>
                    <span>\${item}</span>
                </li>
            \`).join('');
        }

        function renderStartHere(startHere) {
            return \`
                <div class="bg-white rounded-lg p-4 border-2 border-gray-300">
                    <div class="flex items-center gap-2 mb-4">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke-width="2"></path>
                            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke-width="2"></path>
                        </svg>
                        <h3 class="text-xl font-semibold text-gray-900">\${startHere.title}</h3>
                    </div>
                    <div class="space-y-4">
                        \${startHere.items.map(item => \`
                            <div class="bg-gray-50 rounded p-4">
                                <h4 class="font-semibold text-gray-900 mb-2">\${item.name}</h4>
                                <ul class="space-y-2 ml-4">
                                    \${item.steps.map(step => \`
                                        <li class="text-sm text-gray-700 flex items-start gap-2">
                                            <span class="text-blue-600 mt-1">•</span>
                                            <span>\${step}</span>
                                        </li>
                                    \`).join('')}
                                </ul>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
        }

        function renderLevels() {
            const container = document.getElementById('levels-container');
            container.innerHTML = levels.map(level => {
                const isExpanded = state.expandedSections[level.id];
                return \`
                    <div class="border-2 rounded-lg \${level.color}">
                        <div class="\${level.headerColor} p-4 rounded-t-lg cursor-pointer flex items-center justify-between"
                             onclick="toggleSection('\${level.id}')">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900">\${level.name}</h2>
                                <div class="flex items-center gap-2 mt-1">
                                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                                        <polyline points="12 6 12 12 16 14" stroke-width="2"></polyline>
                                    </svg>
                                    <span class="text-sm text-gray-700">\${level.timeline}</span>
                                </div>
                            </div>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                \${isExpanded ?
                                    '<polyline points="6 9 12 15 18 9" stroke-width="2"></polyline>' :
                                    '<polyline points="9 18 15 12 9 6" stroke-width="2"></polyline>'}
                            </svg>
                        </div>

                        <div class="section-content \${isExpanded ? 'expanded' : ''} p-6 space-y-6">
                            <!-- Ready When -->
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                                        <circle cx="12" cy="12" r="6" stroke-width="2"></circle>
                                        <circle cx="12" cy="12" r="2" stroke-width="2"></circle>
                                    </svg>
                                    <h3 class="text-xl font-semibold text-gray-900">You're Ready for This Level When:</h3>
                                </div>
                                <ul class="space-y-2">
                                    \${renderList(level.readyWhen)}
                                </ul>
                            </div>

                            <!-- Start Here -->
                            \${renderStartHere(level.startHere)}

                            <!-- Quick Wins -->
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <line x1="9" y1="18" x2="15" y2="18" stroke-width="2"></line>
                                        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" stroke-width="2"></path>
                                    </svg>
                                    <h3 class="text-xl font-semibold text-gray-900">Quick Wins to Build Momentum</h3>
                                </div>
                                <ul class="space-y-2">
                                    \${level.quickWins.map(item => \`
                                        <li class="flex items-start gap-2 text-gray-700 bg-yellow-50 p-3 rounded">
                                            <span class="text-yellow-600 font-bold">💡</span>
                                            <span>\${item}</span>
                                        </li>
                                    \`).join('')}
                                </ul>
                            </div>

                            <!-- Pitfalls -->
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" stroke-width="2"></path>
                                        <line x1="12" y1="9" x2="12" y2="13" stroke-width="2"></line>
                                    </svg>
                                    <h3 class="text-xl font-semibold text-gray-900">Common Pitfalls to Avoid</h3>
                                </div>
                                <ul class="space-y-2">
                                    \${level.pitfalls.map(item => \`
                                        <li class="flex items-start gap-2 text-gray-700 bg-red-50 p-3 rounded">
                                            <span>\${item}</span>
                                        </li>
                                    \`).join('')}
                                </ul>
                            </div>

                            <!-- Success Looks Like -->
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <h3 class="text-xl font-semibold text-gray-900">Success Looks Like</h3>
                                </div>
                                <ul class="space-y-2">
                                    \${level.successLooks.map(item => \`
                                        <li class="flex items-start gap-2 text-gray-700 bg-green-50 p-3 rounded">
                                            <span>\${item}</span>
                                        </li>
                                    \`).join('')}
                                </ul>
                            </div>

                            <!-- Ready for Next Level -->
                            <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                                <h3 class="text-lg font-semibold text-gray-900 mb-3">When to Move to the Next Level</h3>
                                <ul class="space-y-2">
                                    \${level.nextLevel.map(item => \`
                                        <li class="flex items-start gap-2 text-gray-700">
                                            <span class="text-purple-600 font-bold">→</span>
                                            <span>\${item}</span>
                                        </li>
                                    \`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                \`;
            }).join('');
        }

        // Initial render
        renderLevels();
    </script>
</body>
</html>`;
}

function generateAll() {
  const buildDir = path.join(__dirname, '..', 'build');

  // Check if build directory exists
  if (!fs.existsSync(buildDir)) {
    console.error('Error: build directory not found.');
    process.exit(1);
  }

  const generators = {
    'model': { dataFile: 'model.json', outputFile: 'model.html', generator: generateModelHTML },
    'assessment': { dataFile: 'assessment.json', outputFile: 'assessment.html', generator: generateAssessmentHTML },
    'guide': { dataFile: 'guide.json', outputFile: 'guide.html', generator: generateGuideHTML }
  };

  Object.entries(generators).forEach(([name, config]) => {
    const dataPath = path.join(buildDir, config.dataFile);
    const outputPath = path.join(__dirname, '..', 'public', config.outputFile);

    console.log(`Generating ${config.outputFile}...`);

    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      const html = config.generator(data);
      fs.writeFileSync(outputPath, html);
      console.log(`✓ Generated ${config.outputFile}`);
    } catch (error) {
      console.error(`✗ Error generating ${config.outputFile}:`, error.message);
    }
  });

  console.log('\nHTML generation complete!');
}

// Run if executed directly
if (require.main === module) {
  generateAll();
}

module.exports = { generateModelHTML, generateAssessmentHTML, generateGuideHTML, generateAll };
