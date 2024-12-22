from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from base.models import Users, Projects, Tasks
from api.serializers import UserSerializer, ProjectSerializer, TaskSerializer

class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'testuser@example.com'
        }
        self.user = Users.objects.create_user(**self.user_data)

    def test_user_creation(self):
        response = self.client.post(reverse('signup'), self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        response = self.client.post(reverse('login'), {
            'identifier': self.user_data['username'],
            'password': self.user_data['password']
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

class ProjectTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Users.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.project_data = {
            'name': 'Test Project',
            'description': 'Test Project Description',
            'owner': self.user.id
        }

    def test_project_creation(self):
        response = self.client.post(reverse('project-list'), self.project_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], self.project_data['name'])

    def test_project_list(self):
        Projects.objects.create(**self.project_data)
        response = self.client.get(reverse('project-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class TaskTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Users.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.project = Projects.objects.create(name='Test Project', owner=self.user)
        self.task_data = {
            'title': 'Test Task',
            'description': 'Test Task Description',
            'project': self.project.id,
            'assigned_to': self.user.id,
            'status': 'To Do',
            'priority': 'Medium'
        }

    def test_task_creation(self):
        response = self.client.post(reverse('task-list'), self.task_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], self.task_data['title'])

    def test_task_list(self):
        Tasks.objects.create(**self.task_data)
        response = self.client.get(reverse('task-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)