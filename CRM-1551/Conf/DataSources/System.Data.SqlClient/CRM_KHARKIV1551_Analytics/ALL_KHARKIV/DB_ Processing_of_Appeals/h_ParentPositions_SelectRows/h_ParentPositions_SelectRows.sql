
if object_id('tempdb..#org_and_parent') is not null 
begin
drop table #org_and_parent
end


;with
pit as -- родители @id
(
select Id, [parent_organization_id] ParentId, short_name name
from [dbo].[Organizations]  t
union all
select t.Id, t.[parent_organization_id] ParentId, t.short_name name
from [dbo].[Organizations]  t inner join pit on t.Id=pit.ParentId
)
select distinct * into #org_and_parent from pit-- pit it


-- вывести:
/*
1.организацию исполнителя
2.их родительские организации
3.главные посади родительских организаций
*/

if object_id('tempdb..#position_org') is not null 
begin
drop table #position_org
end

select [Positions].Id, [Positions].organizations_id, [Positions].Id position_id, ISNULL([Positions].position+N' ',N'')+ISNULL(N'('+[Organizations].short_name+N')',N'') name
into #position_org
from [dbo].[Positions]
left join [dbo].[Organizations] on [Positions].organizations_id=[Organizations].Id
where [Positions].is_main='true'


--select * from #org_and_parent

select #position_org.Id, #org_and_parent.Id vykonavets_Id, #position_org.name
from #position_org
inner join #org_and_parent on #position_org.organizations_id=#org_and_parent.ParentId


