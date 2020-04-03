
with [Parent_organizations] as (
 SELECT [Id]
      ,[Name]
      ,[Parent_Organization_ID]
  FROM [dbo].[Organizations]
	where Is_Wc = 1 and Id <> 28 and #filter_columns#
	),
[Child_organizations] as (

	 SELECT [Id]
      ,[Name]
      ,[Parent_Organization_ID]
  FROM [Parent_organizations]

  union all

  select
	[Organizations].Id
	,[Organizations].Name
	,[Organizations].Parent_Organization_ID
   from [Organizations]
 -- where exists (select * from [Parent_organizations] where [Parent_organizations].Id = [Organizations].Parent_Organization_ID)
    inner join Parent_organizations on Parent_organizations.Id = Organizations.Parent_Organization_ID
 
  )
  select 
	   [Id]
      ,Name
	  ,Parent_Organization_ID
	from [Child_organizations]

	