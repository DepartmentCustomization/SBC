select 
    Name
    -- ,convert(time(0), Plan_start_time) as Plan_start_time
    -- ,convert(time(0), Plan_end_time) as Plan_end_time
    ,Plan_start_time
    ,Plan_end_time
    -- ,TIMEFROMPARTS (DATEPART(hh, Plan_end_time),DATEPART(minute, Plan_end_time),0,0,0) as Plan_end_time
from teams
where Id = @teams_id