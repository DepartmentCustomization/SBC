
--declare @Id int = 2
--declare @claim_executor_Id int = 4
--declare @claim_executor_comment nvarchar(1000) = N'dasdas dsa'
--declare @claim_state_id int = 1


declare @cl_state_id int = (Select top 1 c.state_id 
							from [dbo].[claims] as c
							where  c.Id = @Id)

if isnull(@cl_state_id,0) = isnull(@claim_state_id,0)
begin
	update [dbo].[claims] set [executor_id] = @claim_executor_Id,
							  [executor_comment] = @claim_executor_comment
	where Id = @Id
end
else
begin
	if isnull(@claim_state_id,0) in (4, 3)/*Закрита, Відмінена*/
	begin
		update [dbo].[claims] set [executor_id] = @claim_executor_Id,
								  [executor_comment] = @claim_executor_comment,
								  [state_id] = @claim_state_id,
								  [executed_at] = getutcdate()
		where Id = @Id
	end

	if isnull(@claim_state_id,0) in (2)/*В роботі*/
	begin
		update [dbo].[claims] set [executor_id] = @claim_executor_Id,
								  [executor_comment] = @claim_executor_comment,
								  [state_id] = @claim_state_id,
								  [pushed_at] = getutcdate()
		where Id = @Id
	end

	if isnull(@claim_state_id,0) not in (2,4,2) /*В роботі, Закрита, Відмінена*/
	begin
		update [dbo].[claims] set [executor_id] = @claim_executor_Id,
								  [executor_comment] = @claim_executor_comment,
								  [state_id] = @claim_state_id
		where Id = @Id
	end

end