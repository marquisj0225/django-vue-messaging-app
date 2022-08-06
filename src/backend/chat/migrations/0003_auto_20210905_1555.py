from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_chat_trash'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chat',
            old_name='trash',
            new_name='trash_by_recipient',
        ),
        migrations.AddField(
            model_name='chat',
            name='trash_by_user',
            field=models.BooleanField(default=False),
        ),
    ]
