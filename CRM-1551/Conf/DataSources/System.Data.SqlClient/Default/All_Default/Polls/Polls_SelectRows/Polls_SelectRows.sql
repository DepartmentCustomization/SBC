select poll_name, is_active, start_date, end_date, PollDirection.name,  AllApplicants.col_Applicants, IsPollsApplicants.col_IsPollsApplicants, IsNotPollsApplicants.col_IsNotApplicants
from Polls
inner join Polls_PollDirections on Polls_PollDirections.poll_id = Polls.id
inner join PollDirection on PollDirection.id = Polls_PollDirections.direction_id
left join ( select poll_id, count(id) as col_Applicants from PollsApplicants  group by poll_id) AllApplicants on AllApplicants.poll_id = Polls.id
left join ( select poll_id, count(id) as col_IsPollsApplicants from PollsApplicants  where poll_date is not null group by poll_id) IsPollsApplicants on IsPollsApplicants.poll_id = Polls.id
left join ( select poll_id, count(id) as col_IsNotApplicants from PollsApplicants  where reject_poll = 1 group by poll_id) IsNotPollsApplicants on IsNotPollsApplicants.poll_id = Polls.id
where cast([start_date] as date) >= cast(@DateStart as date)  and cast(end_date as date) <= cast(@DateEnd as date) and
(is_active  = @is_active  or isnull(@is_active, 0) = 0) and
#filter_columns#
order by 1
