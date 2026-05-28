#chat_db.py
from backend.supabase_client import supabase

def save_message(chat_id, sender, message_type, content):
    data = {
        "chat_id": chat_id,
        "sender": sender,
        "type": message_type,
        "content": content
    }

    supabase.table("messages").insert(data).execute()

import datetime

def create_chat(user_id="default_user", machine_name=None):
    if machine_name:
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        title = f"{machine_name}_{date_str}"
    else:
        title = "New Chat"

    data = {
        "user_id": user_id,
        "title": title
    }

    response = supabase.table("chats").insert(data).execute()

    return response.data[0]["id"]