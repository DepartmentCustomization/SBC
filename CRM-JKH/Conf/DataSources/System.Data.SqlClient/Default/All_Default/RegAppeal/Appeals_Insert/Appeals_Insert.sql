-- declare @user_id nvarchar(128) = N'c53a28a7-deea-4b5a-8a54-6dabac159098'
-- declare @appeal_type_id int = 1
-- declare @parameter nvarchar(10) = N'0993896537'

declare @appeal_source_id int = (select top 1 [appeal_sources].[Id] 
								from [#system_database_name#].[dbo].[UserInOrganisation]
								left join [#system_database_name#].[dbo].[OrganisationStructure] on [OrganisationStructure].[Id] = [UserInOrganisation].[OrganisationStructureId]
								left join [dbo].[appeal_sources] on [appeal_sources].[Name] = [OrganisationStructure].[Name]
								where [UserInOrganisation].[UserId] = @user_id 
								and [UserInOrganisation].[OrganisationStructureId] not in (1))
declare @output table (Id int)

INSERT INTO [dbo].[Appeals]
            ([appeal_source_id]
			,[appeal_type_id]
			,[parameter]
			,[created_by])
output [inserted].[Id] into @output (Id)
     VALUES
           (@appeal_source_id
           ,@appeal_type_id
           ,case when len(isnull(replace(rtrim(@parameter),N'"',N''), N'')) > 0 then replace(rtrim(@parameter),N'"',N'') else NULL end
           ,@user_id
		   )

declare @app_id int
set @app_id = (select top 1 Id from @output)

select @app_id as [Id]
return;