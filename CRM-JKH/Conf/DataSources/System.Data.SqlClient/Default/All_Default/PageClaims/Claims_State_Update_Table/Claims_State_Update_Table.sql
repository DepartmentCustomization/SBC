update [claims] set [state_id] = 2
where [Id] in (
				select c.Id
				from [dbo].[claims] c
				left join [dbo].[employees] e on e.Id = c.executor_id
				where (c.[state_id] = 1)
				and e.organization_id @GlobalFilterOrganization
				)
select 1 as Id