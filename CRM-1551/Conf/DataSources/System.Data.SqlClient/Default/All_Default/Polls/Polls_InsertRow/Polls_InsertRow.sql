declare @output table (Id int)
Insert into [dbo].Polls (poll_name
							,is_active
							,start_date
							,end_date
							,people_limit
							,add_date
							,user_id
							,edit_date
							,user_edit_id
							)
output [inserted].[Id] into @output (Id)
values ( @poll_name
		,@is_active
		,@start_date
		,@end_date
		,@people_limit
       ,GETUTCDATE()
       ,@CreatedUserById
       ,GETUTCDATE()
      ,@CreatedUserById
	  )

declare @app_id int
set @app_id = (select top 1 Id from @output)

select @app_id as [Id]
return;