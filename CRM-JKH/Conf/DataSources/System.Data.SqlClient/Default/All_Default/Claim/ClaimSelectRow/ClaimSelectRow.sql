--declare @Id int = 4

SELECT c.[Id]
	  ,a.[Id] as [appeal_id]
	  ,[appeal_sources].[Name] as [appeal_source_id]
	  ,[appeal_types].[Name] as [appeal_type_id]
      ,a.[parameter] as [appeal_parameter]
      ,a.[created_at] as [appeal_created_at]
      ,isnull([User].LastName,N'')+N' '+isnull([User].FirstName,N'')+N' '+isnull([User].Patronymic,N'')+N' ('+isnull([User].UserName,N'')+N')' as [appeal_created_by]
       
	  ,ap.PIB as [applicant_PIB]
	  ,ap.Phone1 as [applicant_Phone1]
	  ,ap.Phone2 as [applicant_Phone2]
	  ,ap.EMail as [applicant_Email]
	  ,case when ap.[House_id] is null then null 
		      when isnull(aps.[name_shortToponym],N'')+N' '+isnull(aps.[name_fullName],N'')+N', '+isnull(aph.[name_ofFirstLevel_shortToponym],N'')+N' '+isnull(aph.[name_ofFirstLevel_fullName],N'') = N' ,  ' then null
				    else isnull(aps.[name_shortToponym],N'')+N' '+isnull(aps.[name_fullName],N'')+N', '+isnull(aph.[name_ofFirstLevel_shortToponym],N'')+N' '+isnull(aph.[name_ofFirstLevel_fullName],N'') end 
				+ case when len(isnull(ap.Flat,N'')) > 0 then N', кв. '+	ap.Flat else N'' end	
				as applicant_Adress
	 
	 ,ct.[Name] as [claim_type]
	 ,case when c.[House_id] is null then null 
		      when isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'')+N', '+isnull([houses].[name_ofFirstLevel_shortToponym],N'')+N' '+isnull([houses].[name_ofFirstLevel_fullName],N'') = N' ,  ' then null
				    else isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'')+N', '+isnull([houses].[name_ofFirstLevel_shortToponym],N'')+N' '+isnull([houses].[name_ofFirstLevel_fullName],N'') end 
				+ case when len(isnull(c.Flat,N'')) > 0 then N', кв. '+	c.Flat else N'' end	
				as claim_Adress
	 ,c.executor_id as [claim_executor_Id]
	 ,isnull(e.PIB,N'')+N' ('+isnull(e.position,N'')+N')' as [claim_executor_name]
	 ,c.state_id as [claim_state_id]
	 ,s.Name as [claim_state_name]
	 ,c.comment as [claim_comment]
	 ,c.executor_comment as [claim_executor_comment]
	 ,c.control_date as [claim_control_date]
FROM [dbo].[claims] c
left join [dbo].[claim_states] s on s.Id = c.state_id
left join [dbo].[claim_types] ct on ct.Id = c.claim_type_id 
left join [dbo].[houses] on [houses].[id] = c.[House_id]
left join [dbo].[streets] on [streets].[id] = [houses].[ofStreet_id]
left join [dbo].[employees] e on e.Id = c.executor_id
left join [dbo].[organizations] o on o.Id = e.organization_id
left join [dbo].[appeals] a on a.Id = c.appeal_Id
left join [dbo].[applicants] ap on ap.Id = a.applicant_id
left join [dbo].[houses] as aph on aph.[id] = ap.[House_id]
left join [dbo].[streets] as aps  on aps.[id] = aph.[ofStreet_id]
left join [dbo].[appeal_sources] on [appeal_sources].Id = a.appeal_source_id
left join [dbo].[appeal_types] on [appeal_types].Id = a.appeal_type_id
left join [#system_database_name#].[dbo].[User] on [User].[UserId] = a.[created_by]
where c.[Id] = @Id

