
select * from (
	SELECT 0 as [Id], N'Усі організаціі' as [Name]
	union all
	select [Id],
			[Name]
	from [dbo].[organizations]
) as t
/*where Id @GlobalFilterOrganization*/
where Id in (
							SELECT k.[key]
						  FROM [#system_database_name#].[dbo].[OrganisationStructureRightsFilterKey] as k
						  left join [#system_database_name#].[dbo].[OrganisationStructureRightsFilter]  as kl on kl.Id = k.RightsFilterId
						  where kl.OrganisationStructureId in (
								SELECT [OrganisationStructureId]
								FROM [#system_database_name#].[dbo].[UserInOrganisation]
								where [UserId] = @UserId and [OrganisationStructureId] not in (1)
								)
						and k.AccessLevel = 1
						)
and #filter_columns#
    #sort_columns#
    offset @pageOffsetRows rows fetch next @pageLimitRows rows only