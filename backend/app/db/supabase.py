from supabase import create_client, Client
from app.core.config import settings
import logging

logger = logging.getLogger("upsc_mentor")

try:
    supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    supabase_admin: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
except Exception as e:
    logger.warning(f"Failed to initialize Supabase client: {e}. Using mock mode.")
    supabase = None
    supabase_admin = None

def get_supabase_client() -> Client:
    return supabase

def get_supabase_admin() -> Client:
    return supabase_admin
