from backend.supabase_client import supabase

def save_message(chat_id, sender, message_type, content):
    data = {
        "chat_id": chat_id,
        "sender": sender,
        "type": message_type,
        "content": content
    }

    supabase.table("messages").insert(data).execute()

def create_chat(user_id="default_user"):
    data = {
        "user_id": user_id,
        "title": "New Chat"
    }

    response = supabase.table("chats").insert(data).execute()

    return response.data[0]["id"]