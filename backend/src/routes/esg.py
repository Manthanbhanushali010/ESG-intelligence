from flask import Blueprint, request, jsonify
import random
import time
from datetime import datetime, timedelta

esg_bp = Blueprint('esg', __name__)

# ESG Company Database
ESG_COMPANIES = {
    'TSLA': {
        'name': 'Tesla Inc.',
        'sector': 'Automotive',
        'environmental': 92,
        'social': 78,
        'governance': 85,
        'overall': 85,
        'carbon_neutral': True,
        'renewable_energy': 95,
        'sustainability_goals': [
            'Accelerate sustainable transport',
            'Zero emissions manufacturing',
            'Renewable energy ecosystem',
            'Sustainable supply chain'
        ],
        'key_initiatives': [
            'Gigafactory renewable energy',
            'Battery recycling program',
            'Employee safety excellence',
            'Transparent reporting'
        ]
    },
    'MSFT': {
        'name': 'Microsoft Corporation',
        'sector': 'Technology',
        'environmental': 88,
        'social': 94,
        'governance': 95,
        'overall': 92,
        'carbon_neutral': True,
        'renewable_energy': 100,
        'sustainability_goals': [
            'Carbon negative by 2030',
            '100% renewable energy',
            'Zero waste operations',
            'Water positive by 2030'
        ],
        'key_initiatives': [
            'AI for Earth program',
            'Climate Innovation Fund',
            'Diverse workforce initiatives',
            'Transparent governance'
        ]
    },
    'AAPL': {
        'name': 'Apple Inc.',
        'sector': 'Technology',
        'environmental': 91,
        'social': 86,
        'governance': 90,
        'overall': 89,
        'carbon_neutral': True,
        'renewable_energy': 100,
        'sustainability_goals': [
            'Carbon neutral by 2030',
            '100% recycled materials',
            'Zero waste to landfill',
            'Renewable energy supply chain'
        ],
        'key_initiatives': [
            'Supplier Clean Energy Program',
            'Recycling robot Daisy',
            'Privacy protection',
            'Accessibility features'
        ]
    },
    'NFLX': {
        'name': 'Netflix Inc.',
        'sector': 'Media & Entertainment',
        'environmental': 75,
        'social': 88,
        'governance': 82,
        'overall': 82,
        'carbon_neutral': True,
        'renewable_energy': 78,
        'sustainability_goals': [
            'Net zero emissions by 2030',
            'Diverse content creation',
            'Global accessibility',
            'Responsible content'
        ],
        'key_initiatives': [
            'Carbon offset programs',
            'Inclusive storytelling',
            'Employee wellbeing',
            'Data privacy protection'
        ]
    },
    'NVDA': {
        'name': 'NVIDIA Corporation',
        'sector': 'Technology',
        'environmental': 88,
        'social': 85,
        'governance': 90,
        'overall': 88,
        'carbon_neutral': False,
        'renewable_energy': 65,
        'sustainability_goals': [
            'AI for climate solutions',
            'Sustainable computing',
            'Diverse workforce',
            'Ethical AI development'
        ],
        'key_initiatives': [
            'Energy efficient GPUs',
            'STEM education programs',
            'Responsible AI research',
            'Supply chain transparency'
        ]
    },
    'META': {
        'name': 'Meta Platforms Inc.',
        'sector': 'Technology',
        'environmental': 82,
        'social': 76,
        'governance': 78,
        'overall': 79,
        'carbon_neutral': True,
        'renewable_energy': 100,
        'sustainability_goals': [
            'Net zero emissions by 2030',
            'Digital inclusion',
            'Privacy protection',
            'Responsible innovation'
        ],
        'key_initiatives': [
            '100% renewable energy',
            'Digital literacy programs',
            'Content moderation',
            'Transparent governance'
        ]
    },
    'AMZN': {
        'name': 'Amazon.com Inc.',
        'sector': 'E-commerce',
        'environmental': 78,
        'social': 82,
        'governance': 85,
        'overall': 82,
        'carbon_neutral': False,
        'renewable_energy': 85,
        'sustainability_goals': [
            'Net zero carbon by 2040',
            'Climate pledge fund',
            'Sustainable packaging',
            'Employee development'
        ],
        'key_initiatives': [
            'Electric delivery fleet',
            'Renewable energy projects',
            'Skills training programs',
            'Supplier diversity'
        ]
    }
}

@esg_bp.route('/api/esg/analyze', methods=['POST'])
def analyze_company():
    """Analyze ESG profile for a specific company"""
    try:
        data = request.get_json()
        company_symbol = data.get('symbol', '').upper()
        
        if not company_symbol:
            return jsonify({'error': 'Company symbol is required'}), 400
        
        # Simulate AI processing time
        time.sleep(2)
        
        if company_symbol in ESG_COMPANIES:
            company_data = ESG_COMPANIES[company_symbol]
            
            # Add some randomization to simulate real-time analysis
            environmental = company_data['environmental'] + random.randint(-3, 3)
            social = company_data['social'] + random.randint(-3, 3)
            governance = company_data['governance'] + random.randint(-3, 3)
            overall = (environmental + social + governance) // 3
            
            # Determine recommendation based on overall score
            if overall >= 85:
                recommendation = 'Strong Buy'
                risk_level = 'Low'
            elif overall >= 75:
                recommendation = 'Buy'
                risk_level = 'Medium'
            else:
                recommendation = 'Hold'
                risk_level = 'High'
            
            result = {
                'symbol': company_symbol,
                'name': company_data['name'],
                'sector': company_data['sector'],
                'scores': {
                    'environmental': max(0, min(100, environmental)),
                    'social': max(0, min(100, social)),
                    'governance': max(0, min(100, governance)),
                    'overall': max(0, min(100, overall))
                },
                'recommendation': recommendation,
                'risk_level': risk_level,
                'carbon_neutral': company_data['carbon_neutral'],
                'renewable_energy': company_data['renewable_energy'],
                'sustainability_goals': company_data['sustainability_goals'],
                'key_initiatives': company_data['key_initiatives'],
                'analysis_timestamp': datetime.now().isoformat(),
                'confidence': random.randint(85, 98)
            }
            
            return jsonify(result)
        else:
            # Generate mock data for unknown companies
            environmental = random.randint(60, 95)
            social = random.randint(65, 90)
            governance = random.randint(70, 95)
            overall = (environmental + social + governance) // 3
            
            if overall >= 85:
                recommendation = 'Strong Buy'
                risk_level = 'Low'
            elif overall >= 75:
                recommendation = 'Buy'
                risk_level = 'Medium'
            else:
                recommendation = 'Hold'
                risk_level = 'High'
            
            result = {
                'symbol': company_symbol,
                'name': f'{company_symbol} Corporation',
                'sector': 'Technology',
                'scores': {
                    'environmental': environmental,
                    'social': social,
                    'governance': governance,
                    'overall': overall
                },
                'recommendation': recommendation,
                'risk_level': risk_level,
                'carbon_neutral': random.choice([True, False]),
                'renewable_energy': random.randint(30, 100),
                'sustainability_goals': [
                    'Carbon neutrality by 2030',
                    'Sustainable operations',
                    'Employee wellbeing',
                    'Ethical governance'
                ],
                'key_initiatives': [
                    'Green energy transition',
                    'Diversity programs',
                    'Transparent reporting',
                    'Community engagement'
                ],
                'analysis_timestamp': datetime.now().isoformat(),
                'confidence': random.randint(75, 95)
            }
            
            return jsonify(result)
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@esg_bp.route('/api/esg/rankings', methods=['GET'])
def get_esg_rankings():
    """Get top ESG performing companies"""
    try:
        # Generate rankings based on stored data
        rankings = []
        for symbol, data in ESG_COMPANIES.items():
            rankings.append({
                'symbol': symbol,
                'name': data['name'],
                'sector': data['sector'],
                'overall_score': data['overall'],
                'environmental': data['environmental'],
                'social': data['social'],
                'governance': data['governance'],
                'carbon_neutral': data['carbon_neutral'],
                'renewable_energy': data['renewable_energy']
            })
        
        # Sort by overall score
        rankings.sort(key=lambda x: x['overall_score'], reverse=True)
        
        # Add ranking positions
        for i, company in enumerate(rankings):
            company['rank'] = i + 1
            if company['overall_score'] >= 85:
                company['recommendation'] = 'Strong Buy'
            elif company['overall_score'] >= 75:
                company['recommendation'] = 'Buy'
            else:
                company['recommendation'] = 'Hold'
        
        return jsonify(rankings)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@esg_bp.route('/api/esg/trends', methods=['GET'])
def get_esg_trends():
    """Get ESG performance trends over time"""
    try:
        # Generate trend data for the last 6 months
        trends = []
        base_date = datetime.now() - timedelta(days=150)
        
        for i in range(6):
            month_date = base_date + timedelta(days=30 * i)
            trends.append({
                'month': month_date.strftime('%b'),
                'environmental': 72 + i * 2 + random.randint(-1, 1),
                'social': 68 + i * 2 + random.randint(-1, 1),
                'governance': 85 + i + random.randint(-1, 1),
                'overall': 75 + i * 1.5 + random.randint(-1, 1)
            })
        
        return jsonify(trends)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@esg_bp.route('/api/esg/sectors', methods=['GET'])
def get_sector_analysis():
    """Get ESG performance by sector"""
    try:
        sectors = [
            {
                'sector': 'Technology',
                'environmental': 78,
                'social': 82,
                'governance': 88,
                'companies_count': 245
            },
            {
                'sector': 'Healthcare',
                'environmental': 65,
                'social': 85,
                'governance': 82,
                'companies_count': 156
            },
            {
                'sector': 'Financial Services',
                'environmental': 58,
                'social': 72,
                'governance': 92,
                'companies_count': 189
            },
            {
                'sector': 'Energy',
                'environmental': 45,
                'social': 68,
                'governance': 75,
                'companies_count': 98
            },
            {
                'sector': 'Consumer Goods',
                'environmental': 62,
                'social': 78,
                'governance': 80,
                'companies_count': 167
            }
        ]
        
        return jsonify(sectors)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@esg_bp.route('/api/esg/metrics', methods=['GET'])
def get_esg_metrics():
    """Get overall ESG metrics and statistics"""
    try:
        metrics = {
            'total_companies': 2847,
            'average_esg_score': 78.4,
            'sustainable_leaders': 342,
            'carbon_neutral_companies': 156,
            'score_distribution': {
                'excellent': 342,  # 85+
                'good': 1245,      # 70-84
                'fair': 987,       # 55-69
                'poor': 273        # <55
            },
            'sector_leaders': [
                {'sector': 'Technology', 'leader': 'MSFT', 'score': 92},
                {'sector': 'Healthcare', 'leader': 'JNJ', 'score': 89},
                {'sector': 'Financial', 'leader': 'JPM', 'score': 87},
                {'sector': 'Energy', 'leader': 'NEE', 'score': 85},
                {'sector': 'Consumer', 'leader': 'PG', 'score': 88}
            ]
        }
        
        return jsonify(metrics)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

