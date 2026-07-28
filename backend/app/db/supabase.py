from supabase import create_client, Client
from app.core.config import settings
import logging

logger = logging.getLogger("upsc_mentor")

try:
    # Use SUPABASE_KEY if it starts with eyJ (classic JWT format), otherwise use SUPABASE_SERVICE_ROLE_KEY
    key_to_use = settings.SUPABASE_KEY if settings.SUPABASE_KEY and settings.SUPABASE_KEY.startswith("eyJ") else settings.SUPABASE_SERVICE_ROLE_KEY
    supabase: Client = create_client(settings.SUPABASE_URL, key_to_use)
    supabase_admin: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
    logger.info("Supabase client initialized successfully!")
except Exception as e:
    logger.warning(f"Failed to initialize Supabase client: {e}. Using mock mode.")
    supabase = None
    supabase_admin = None

def get_supabase_client() -> Client:
    return supabase

def get_supabase_admin() -> Client:
    return supabase_admin
