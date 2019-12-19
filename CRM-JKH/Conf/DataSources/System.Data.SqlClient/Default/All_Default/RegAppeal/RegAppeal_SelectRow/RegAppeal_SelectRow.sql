SELECT [appeals].[Id]
      ,[appeals].[appeal_source_id] as [appeal_source_id2]
	  ,[appeal_sources].[Name] as [appeal_source_id]
      ,[appeals].[appeal_type_id] as [appeal_type_id2]
	  ,[appeal_types].[Name] as [appeal_type_id]
      ,[appeals].[parameter] as [appeal_parameter]
      ,[appeals].[applicant_id]
	  ,[applicants].[PIB] as [applicant_name]
      ,[appeals].[created_at] as [appeal_created_at]
      ,[appeals].[created_by]
      ,case when [appeals].[appeal_type_id] = 1 then [appeals].[parameter] else null end as [Search_Phone]
	  ,case when [appeals].[appeal_type_id] = 2 then [appeals].[parameter] else null end as [Search_Email]
        ,[appeals].[Id] as [appeal_id]
        , isnull([User].LastName,N'')+N' '+isnull([User].FirstName,N'')+N' '+isnull([User].Patronymic,N'')+N' ('+isnull([User].UserName,N'')+N')' as [appeal_created_by]
        
FROM [dbo].[appeals]
left join [dbo].[appeal_sources] on [appeal_sources].Id = [appeals].appeal_source_id
left join [dbo].[appeal_types] on [appeal_types].Id = [appeals].appeal_type_id
left join [dbo].[applicants] on [applicants].Id = [appeals].[applicant_id]
left join [#system_database_name#].[dbo].[User] on [User].[UserId] = [appeals].[created_by]
where [appeals].[Id] = @Id