import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yhdaexpiuwfqoigtxezo.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZGFleHBpdXdmcW9pZ3R4ZXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc3MzIwOTgsImV4cCI6MTk4MzMwODA5OH0.-1rkB9qcOKod2KOTbt9PEtU8-_FWE5XxQ5hQwqlAq3M"
export const supabase = createClient(supabaseUrl, supabaseKey, {
	realtime: {
		params: {
			eventsPerSecond: 10,
		},
	},
})

