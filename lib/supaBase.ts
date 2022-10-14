import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqiwoznxfmkybloszjok.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaXdvem54Zm1reWJsb3N6am9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ1NjIxMTksImV4cCI6MTk4MDEzODExOX0.RwHf5KJwV_xCj8g9lBnm94LDDuFdsamJrZADGPjxf7s"
export const supabase = createClient(supabaseUrl, supabaseKey, {
	realtime: {
		params: {
			eventsPerSecond: 10,
		},
	},
})