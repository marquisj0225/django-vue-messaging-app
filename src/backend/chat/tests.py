from chat import serializers
import json

from django.urls import reverse
from django.db import transaction, IntegrityError

from rest_framework.test import APITestCase, APITransactionTestCase
from rest_framework.views import status
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Chat
from django.contrib.auth import get_user_model
User = get_user_model()


class BaseViewTest(APITestCase):

    email1 = 'admin@admin.admin'

    email2 = 'admin1@admin.admin'
    password = 'admin'

    message_title = 'Message text'
    message_body = 'Message text'

    def setUp(self):
        self._create_test_users()
        self._create_chat()
        self._get_jwt_token()

    def _create_chat(self):
        self.chat = Chat.objects.create(user=self.user1, recipient=self.user2,
                                        title=self.message_title, body=self.message_body)

    def _create_test_users(self):
        self.user1 = User.objects.create_user(
            self.email1, self.password)
        self.user2 = User.objects.create_user(
            self.email2, self.password)

    def _get_jwt_token(self):
        url = reverse('jwt-create')
        response = self.client.post(
            url,
            {'email': self.email1, 'password': self.password},
            format='json'
        )
        self.jwt_token_access = response.data['access']
        self.jwt_token_refresh = response.data['refresh']

    def jwt_auth(self):
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + self.jwt_token_access)

    @classmethod
    def jwt_auth_before(cls, func):
        def wrapper(self):
            self.jwt_auth()
            func(self)
        return wrapper


class ConversationListViewTest(BaseViewTest):

    def setUp(self):
        super(ConversationListViewTest, self).setUp()
        self.url = reverse('chat-list')

    def test_get_conversationlist_authorisation(self):
        response = self.client.get(self.url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_post_conversationlist_authorisation(self):
        response = self.client.post(self.url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    @BaseViewTest.jwt_auth_before
    def test_get_conversationlist(self):
        response = self.client.get(self.url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        user_chat = Q(user=self.user1, trash_by_user=False)
        recipient_chat = Q(recipient=self.user2,  trash_by_recipient=False)
        chats = Chat.objects.filter(user_chat | recipient_chat).order_by('-id')
        serialized = serializers.ChatSerializer(chats, many=True)
        self.assertEqual(response.data, serialized.data)

    @BaseViewTest.jwt_auth_before
    def test_post_conversationlist(self):
        response = self.client.post(self.url, {'with': 'mouath1'})
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        expected = Conversation.objects.all()
        serialized = ConversationSerializer(expected, many=True)
        data = serialized.data
        self.assertEqual(len(data), 2)
        self.assertEqual(data[1]['participants'], ['mouath', 'mouath1'])
