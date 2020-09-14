select Missed_call_counter, Edit_date, MissedCallComment , Assignment_id
from AssignmentDetailHistory
where Missed_call_counter = 1
and Assignment_id = @Assignment_id