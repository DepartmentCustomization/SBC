
-- declare @StatusId int 


select 
	 c.Id,
	 c.Id as [ClaimId],
	 convert(varchar, c.created_at, 104) as created_at,
	 cd.Name as [claim_direction],
	 ct.Name as [claim_type],
	 case when c.[House_id] is null then null 
		      when isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'')+N', '+isnull([houses].[name_ofFirstLevel_shortToponym],N'')+N' '+isnull([houses].[name_ofFirstLevel_fullName],N'') = N' ,  ' then null
	        else isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'')+N', '+isnull([houses].[name_ofFirstLevel_shortToponym],N'')+N' '+isnull([houses].[name_ofFirstLevel_fullName],N'') end 
	+ case when len(isnull(c.Flat,N'')) > 0 then N', кв. '+	c.Flat else N'' end	
			 as Adress,
	s.Name as [claim_state],
	convert(varchar, c.control_date, 104) as control_date,
	convert(varchar, c.executed_at, 104) as executed_at,
	isnull(e.PIB,N'')+N' ('+isnull(e.position,N'')+N')' as [executor],
	o.Name as [org_executor],
	ap.[PIB] as [applicantPIB]
from [dbo].[claims] c
left join [dbo].[claim_states] s on s.Id = c.state_id
left join [dbo].[claim_types] ct on ct.Id = c.claim_type_id
left join [dbo].[claim_directions] cd on cd.Id = ct.claim_direction_id
left join [dbo].[houses] on [houses].[id] = c.[House_id]
left join [dbo].[streets] on [streets].[id] = [houses].[ofStreet_id]
left join [dbo].[employees] e on e.Id = c.executor_id
left join [dbo].[organizations] o on o.Id = e.organization_id
left join [dbo].[appeals] a on a.Id = c.appeal_Id
left join [dbo].[applicants] ap on ap.Id = a.applicant_id
where (c.[claim_type_id] = @TypeId OR isnull(@TypeId,0) = 0)
and (e.[organization_id] = @OrgId OR isnull(@OrgId,0) = 0)
and (cast(c.created_at as date) >= @DateStart and cast(c.created_at as date) <= @DateEnd)
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