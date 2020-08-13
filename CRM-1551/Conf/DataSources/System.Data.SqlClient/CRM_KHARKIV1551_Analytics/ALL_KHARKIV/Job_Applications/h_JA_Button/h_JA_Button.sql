-- declare @result_Id int=4;
--   declare @resolution_Id int=9;
--   declare @Ids nvarchar(max)=N'1,2,3,4'
--   declare @comment nvarchar(max)=N'test'
--   declare @user_id nvarchar(128)=N'';

  declare @state_id int=
  (select distinct [TransitionAssignmentStates].new_assignment_state_id
  from [CRM_1551_Analitics].[dbo].[TransitionAssignmentStates]
  where isnull(new_assignment_result_id,0)=isnull(@result_id,0) and isnull(new_assignment_resolution_id,0)=isnull(@resolution_id,0))

  if OBJECT_ID('tempbd..#temp_Ids') is not null drop table #temp_Ids

  select value Id
  into #temp_Ids
  from string_split((select replace(@Ids, N' ', N'') n), N',')

  --select * from #temp_Ids

  if OBJECT_ID('tempdb..#temp_good_Ids') is not null drop table #temp_good_Ids

select temp_Ids.Id--[Assignments].AssignmentResultsId, [Assignments].AssignmentResolutionsId, [Assignments].assignment_state_id
into #temp_good_Ids
from #temp_Ids temp_Ids
inner join [CRM_1551_Analitics].[dbo].[Assignments] on temp_Ids.Id=[Assignments].Id
inner join [dbo].[TransitionAssignmentStates] 
on [Assignments].assignment_state_id=[TransitionAssignmentStates].old_assignment_state_id
and [Assignments].AssignmentResultsId=[TransitionAssignmentStates].old_assignment_result_id
and [Assignments].AssignmentResolutionsId=[TransitionAssignmentStates].old_assignment_resolution_id
and [TransitionAssignmentStates].new_assignment_result_id=@result_Id
and [TransitionAssignmentStates].new_assignment_resolution_id=@resolution_Id



  if @result_Id=9 /*Прийнято в роботу*/
  begin
	update [CRM_1551_Analitics].[dbo].[Assignments]
	set [assignment_state_id]=@state_id
	,[state_change_date]=getutcdate()	
	,[edit_date]= getutcdate()
	,[user_edit_id]=@user_id
	,[AssignmentResultsId]=@result_Id
	from [CRM_1551_Analitics].[dbo].[Assignments]
	inner join #temp_good_Ids temp_good_Ids on [Assignments].Id=temp_good_Ids.Id

	update [CRM_1551_Analitics].[dbo].[AssignmentConsiderations]
	set [transfer_date] =getutcdate()
	,[assignment_result_id]=@result_Id
	,[short_answer]=@comment
	,[edit_date]=getutcdate()
	,[user_edit_id]=@user_id
	from #temp_good_Ids temp_Ids
	inner join [CRM_1551_Analitics].[dbo].[Assignments] on [Assignments].Id=temp_Ids.Id
	inner join [CRM_1551_Analitics].[dbo].[AssignmentConsiderations] on [AssignmentConsiderations].Id=[Assignments].current_assignment_consideration_id
  end

  if @result_Id=4 /*Виконано*/

  begin
	update [CRM_1551_Analitics].[dbo].[Assignments]
	set [assignment_state_id]=@state_id
	,[state_change_date]=getutcdate()	
	,[edit_date]= getutcdate()
	,[user_edit_id]=@user_id
	,[AssignmentResultsId]=@result_Id
	,[AssignmentResolutionsId]=@resolution_Id
	from [CRM_1551_Analitics].[dbo].[Assignments]
	inner join #temp_good_Ids temp_Ids ON [Assignments].Id=temp_Ids.Id

	update [CRM_1551_Analitics].[dbo].[AssignmentConsiderations]
	set [consideration_date] =getutcdate()
	,[assignment_result_id]=@result_Id
	,[short_answer]=@comment
	,[assignment_resolution_id]=@resolution_Id
	,[edit_date]=getutcdate()
	,[user_edit_id]=@user_id
	from #temp_good_Ids temp_Ids
	inner join [CRM_1551_Analitics].[dbo].[Assignments] on [Assignments].Id=temp_Ids.Id
	inner join [CRM_1551_Analitics].[dbo].[AssignmentConsiderations] on [AssignmentConsiderations].Id=[Assignments].current_assignment_consideration_id

	insert into [CRM_1551_Analitics].[dbo].[AssignmentRevisions]
	(
	[assignment_consideration_іd]
	,[control_type_id]
	,[assignment_resolution_id] 
	,[control_result_id]
	,[control_date]
	,[user_id]
	,[edit_date]
    ,[user_edit_id]
	)

	select
	[AssignmentConsiderations].Id [assignment_consideration_іd]
	,2 [control_type_id]
	,@resolution_Id [assignment_resolution_id] 
	,@result_Id [control_result_id]
	,getutcdate() [control_date]
	,@user_Id [user_id]
	,getutcdate() [edit_date]
    ,@user_Id [user_edit_id]
	from #temp_good_Ids temp_Ids
	inner join [CRM_1551_Analitics].[dbo].[Assignments] on [Assignments].Id=temp_Ids.Id
	inner join [CRM_1551_Analitics].[dbo].[AssignmentConsiderations] on [AssignmentConsiderations].Id=[Assignments].current_assignment_consideration_id
  end