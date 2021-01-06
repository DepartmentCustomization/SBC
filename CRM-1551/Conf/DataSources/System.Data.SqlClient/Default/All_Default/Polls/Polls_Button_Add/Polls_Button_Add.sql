insert into [dbo].[PollsApplicants]
  (
  [applicant_id]
      ,[poll_id]
      --,[reject_poll]
      --,[all_question_done]
      --,[poll_date]
      --,[poller_id]
      ,[add_date]
      ,[user_id]
      ,[edit_date]
      ,[user_edir_id]
  )

  select @applicant_id
      ,@poll_id
      --,@reject_poll
      --,@all_question_done
      --,@poll_date
      --,@poller_id
      ,getutcdate() add_date
      ,@user_id
      ,getutcdate() edit_date
      ,@user_id