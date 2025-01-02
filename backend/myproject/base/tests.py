import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from base.models import Users, Projects, Tasks
from django.contrib.auth.hashers import make_password

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user_data():
    return {
        'username': 'testuser',
        'password': 'testpassword',
        'email': 'testuser@example.com'
    }

@pytest.fixture
def create_user(user_data):
    user = Users.objects.create(
        username=user_data['username'],
        email=user_data['email'],
        password=make_password(user_data['password'])
    )
    return user

@pytest.mark.api
@pytest.mark.django_db
def test_user_creation(api_client, user_data):
    response = api_client.post(reverse('signup'), user_data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.api
@pytest.mark.django_db
def test_user_login(api_client, create_user, user_data):
    response = api_client.post(reverse('login'), {
        'identifier': user_data['username'],
        'password': user_data['password']
    }, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.data
    assert 'refresh' in response.data

@pytest.mark.django_db
def test_project_creation():
    user = Users.objects.create(
        username='testuser',
        email='testuser@example.com',
        password=make_password('testpassword')
    )
    project = Projects.objects.create(name='Test Project', owner=user)
    assert project.name == 'Test Project'
    assert project.owner == user

@pytest.mark.django_db
def test_task_creation():
    user = Users.objects.create(
        username='testuser',
        email='testuser@example.com',
        password=make_password('testpassword')
    )
    project = Projects.objects.create(
        name='Test Project',
        description='Test Description',
        owner=user
    )
    task = Tasks.objects.create(
        title='Test Task',
        description='Test Description',
        project=project,
        status='To Do',
        priority='Medium'
    )
    assert task.title == 'Test Task'
    assert task.project == project
    assert task.status == 'To Do'
    assert task.priority == 'Medium'
    assert task.completed == False

@pytest.mark.api
@pytest.mark.django_db
def test_project_list(api_client, create_user):
    project = Projects.objects.create(
        name='Test Project',
        description='Test Description',
        owner=create_user
    )
    api_client.force_authenticate(user=create_user)
    response = api_client.get(reverse('project-list'))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]['name'] == project.name

@pytest.mark.api
@pytest.mark.django_db
def test_task_list(api_client, create_user):
    project = Projects.objects.create(
        name='Test Project',
        description='Test Description',
        owner=create_user
    )
    task = Tasks.objects.create(
        title='Test Task',
        description='Test Description',
        project=project,
        status='To Do',
        priority='Medium'
    )
    api_client.force_authenticate(user=create_user)
    response = api_client.get(reverse('task-list'))
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]['title'] == task.title