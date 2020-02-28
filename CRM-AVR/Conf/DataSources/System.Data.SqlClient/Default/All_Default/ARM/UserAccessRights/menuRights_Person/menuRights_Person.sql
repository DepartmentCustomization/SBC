 --declare @Id int = 1
 --declare @Type int = 2
 
 
if @Type = 1
begin
select
      table_out2.[Id]
      ,table_out2.[Name]
      ,table_out2.[ParentId]
      ,table_out2.[ParentId_Prev]
	 ,table_out2.kolvo_person
       ,table_out2.kolvo_parent
       ,null as UserId
       ,null as UserName  
 from
(select
      table_out.[Id]
      ,table_out.[Name]
      ,table_out.[ParentId]
      ,table_out.[ParentId_Prev]
	 ,sum(case when table3.UserId is null then 0 else 1 end) as kolvo_person
       ,table_out.kolvo_parent
from (       
    select
      table2.[Id]
      ,table2.[Name]
      ,table2.[ParentId]
      ,table1.[ParentId] as [ParentId_Prev]
      ,count(table4.[Id]) as kolvo_parent
    from [CRM_AVR_System].[dbo].[OrganisationStructure] as table1

    left join 
      (  select
       [Id]
      ,[Name]
      ,[ParentId]
    from [CRM_AVR_System].[dbo].[OrganisationStructure]
    ) as table2 on table2.ParentId = table1.Id
    left join 
      (  select 
       [Id]
      ,[Name]
      ,[ParentId]
    from [CRM_AVR_System].[dbo].[OrganisationStructure]
    ) as table4 on table4.ParentId = table2.Id
    
        where table1.Id  = @Id
      group by table2.[Id]
      ,table2.[Name]
      ,table2.[ParentId]
      ,table1.[ParentId]
  ) as table_out
 left join 
      (  select *
    from [CRM_AVR_System].[dbo].[UserInOrganisation]
    ) as table3 on table3.OrganisationStructureId =  table_out.[Id]

group by      table_out.[Id]
      ,table_out.[Name]
      ,table_out.[ParentId]
      ,table_out.[ParentId_Prev] 
  ,table_out.kolvo_parent
 ) as table_out2 
union all
select 99999,  null, null, null,null,null,
[User].[UserId], 
N'логін: '+[User].[UserName]+N' (користувач: '+isnull([User].LastName, N'')+ N' '+isnull([User].FirstName, N'')+N')' 
from [CRM_AVR_System].dbo.[User]
left join [CRM_AVR_System].dbo.[UserInOrganisation] on [UserInOrganisation].[UserId] = [User].[UserId]
where [UserInOrganisation].OrganisationStructureId = @Id
order by table_out2.[Id]

end
else
begin
select 99999 as [Id],  null as [Name], null as [ParentId], null as [ParentId_Prev],null as kolvo_person,null as kolvo_parent,
[User].[UserId], 
N'логін: '+[User].[UserName]+N' (користувач: '+isnull([User].LastName, N'')+ N' '+isnull([User].FirstName, N'')+N')'  as UserName
from [CRM_AVR_System].dbo.[User]
left join [CRM_AVR_System].dbo.[UserInOrganisation] on [UserInOrganisation].[UserId] = [User].[UserId]
where [UserInOrganisation].OrganisationStructureId = @Id
end
