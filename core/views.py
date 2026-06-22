from django.shortcuts import render
from django.http import JsonResponse
import json

def index(request):
    context = {
        'skills': {
            'Languages': ['Python', 'SQL', 'HTML', 'CSS', 'JavaScript'],
            'Frameworks': ['Django', 'Django REST Framework', 'React', 'Bootstrap'],
            'Databases': ['MySQL', 'SQLite3'],
            'Tools': ['Git', 'GitHub', 'BitBucket', 'VS Code', 'Jira', 'Confluence'],
        },
        'experience': [
            {
                'title': 'Python Django Developer Intern',
                'company': 'Geosys IT Solution Pvt Ltd',
                'location': 'Trivandrum, Kerala',
                'period': 'June 2026 – Present',
                'current': True,
                'points': [
                    'Developing and maintaining web applications using Python, Django, MySQL, HTML, CSS, and JavaScript.',
                    'Building an Excel-based data analysis and report generation system using Django and MySQL.',
                    'Implementing Excel file upload, validation, and dynamic database table creation from uploaded datasets.',
                    'Generating customizable reports and PDF documents based on user-selected data fields.',
                    'Managing sensitive settings using environment variables (.env) for secure configuration.',
                ]
            },
            {
                'title': 'Python Developer Intern',
                'company': 'Luminar Technolab',
                'location': 'Trivandrum, Kerala',
                'period': 'June 2025 – Dec 2025',
                'current': False,
                'points': [
                    'Developed and deployed Django web applications integrated with MySQL databases.',
                    'Implemented CRUD operations, optimized queries using Django ORM, and followed MVT architecture.',
                    'Built user authentication and authorization modules with role-based access control.',
                    'Designed and integrated RESTful APIs for seamless frontend-backend communication.',
                    'Deployed production-ready applications on PythonAnywhere.',
                ]
            },
        ],
        'projects': [
            {
                'name': 'SkillCrest',
                'subtitle': 'Learning Management System',
                'period': 'Nov 2025 – Jan 2026',
                'tech': ['Python', 'Django', 'MySQL', 'Razorpay API'],
                'points': [
                    'Role-based user administration for Students, Trainers, and Admins.',
                    'Integrated Razorpay for secure online payment transactions.',
                    'Automated email notifications for user signups and course purchases.',
                ],
                'github': 'https://github.com/godson-morais',
            }
        ],
        'certifications': [
            'Python Django Developer Certificate — Luminar Technolab',
            'National Council for Technology and Training (NACTET) Certificate',
        ]
    }
    return render(request, 'core/index.html', context)


def contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '')
            email = data.get('email', '')
            message = data.get('message', '')
            # In production: send email or save to DB
            return JsonResponse({'status': 'success', 'message': 'Message received!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
