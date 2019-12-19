SELECT [appeals].[Id]
      ,[appeals].[appeal_source_id]
	  ,[appeal_sources].[Name] as [appeal_source_name]
      ,[appeals].[appeal_type_id]
	  ,[appeal_types].[Name] as [appeal_type_name]
      ,[appeals].[parameter]
      ,[appeals].[applicant_id]
	  ,[applicants].[PIB] as [applicant_name]
      ,[appeals].[created_at]
      ,[appeals].[created_by]
FROM [dbo].[appeals]
left join [dbo].[appeal_sources] on [appeal_sources].Id = [appeals].appeal_source_id
left join [dbo].[appeal_types] on [appeal_types].Id = [appeals].appeal_type_id
left join [dbo].[applicants] on [applicants].Id = [appeals].[applicant_id]
where #filter_columns#
  #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only