  select count(*) as [StatusCount],
s.Name as [Status]
from  [dbo].[claims] d
left join [dbo].[claim_states] s on s.Id = d.state_id
left join [dbo].[employees] e on e.Id = d.executor_id
where s.[Name] not in (N'Нове')
/*and e.organization_id @GlobalFilterOrganization*/
and e.organization_id in (
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
group by s.[Name]