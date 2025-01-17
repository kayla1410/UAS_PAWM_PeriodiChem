import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://djdgkpwyolzhkflgkuhz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZGdrcHd5b2x6aGtmbGdrdWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNjA1MzMsImV4cCI6MjA1MjYzNjUzM30.5DBBmc9JrGeraEfc4X2opf66QNCvymOZR1syeDDe4oM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
