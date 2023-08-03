import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nndovnrmqcnekvftovct.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZG92bnJtcWNuZWt2ZnRvdmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2NDc2NTksImV4cCI6MjAwNjIyMzY1OX0.UNYHOsFxtjz65hRGfXCBN957k4FXJWxMhQ6iyYu6ZCk"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase