
with
  parent_t as
  (select [Id], [Parent_сlaim_types_ID] [Parent_Id], [Claim_types].[TypeAccess_ID], 
        [Claim_types].[Claim_class_ID],
		[Claim_types].[Name],
		[Claim_types].[Full_Name],
		[Claim_types].[Sort_index]
  from [dbo].[Claim_types]
  where [Claim_types].Is_delete != 1
  union all
  select [Claim_types].[Id], [Claim_types].[Parent_сlaim_types_ID], [Claim_types].[TypeAccess_ID], 
		[Claim_types].[Claim_class_ID],
		[Claim_types].[Name],
		[Claim_types].[Full_Name],
		[Claim_types].[Sort_index]
  from [dbo].[Claim_types] 
  inner join  parent_t
  on [Claim_types].Id=parent_t.Parent_Id
  where [Claim_types].Is_delete != 1
  )
  ,childlen_t as
  (
  select [Id], [Parent_сlaim_types_ID] [Parent_Id], [Claim_types].[TypeAccess_ID],
		[Claim_types].[Claim_class_ID],
		[Claim_types].[Name],
		[Claim_types].[Full_Name],
		[Claim_types].[Sort_index]
  from [dbo].[Claim_types]
  where [Claim_types].Is_delete != 1 and 
  ([Claim_types].TypeAccess_ID=103 or [Claim_types].TypeAccess_ID @typeClaim)
  union all
  select [Claim_types].[Id], [Claim_types].[Parent_сlaim_types_ID], [Claim_types].[TypeAccess_ID],
		[Claim_types].[Claim_class_ID],
		[Claim_types].[Name],
		[Claim_types].[Full_Name],
		[Claim_types].[Sort_index]
  from [dbo].[Claim_types] 
  inner join  childlen_t
  on [Claim_types].[Parent_сlaim_types_ID]=childlen_t.Id
  where [Claim_types].Is_delete != 1 and [Claim_types].TypeAccess_ID @typeClaim
  )
  , main as
  (select distinct
  [Id]
  ,[Parent_Id] [Parent_сlaim_types_ID]
  ,[Claim_class_ID]
  ,[Name]
  ,[Full_Name]
  ,[TypeAccess_ID] [TypeAccessId]
  ,[Sort_index]
  from childlen_t
  --where Parent_Id=1764
  --where Parent_Id is null
  where #filter_columns#
   )
   
   ,main_2 as
   (
   select [Id]
  ,[Parent_сlaim_types_ID]
  ,[Claim_class_ID]
  ,[Name]
  ,[Full_Name]
  ,[TypeAccessId]
  ,[Sort_index]
   from main

   
   union
   
   select distinct childlen_t.[Id], 
   childlen_t.[Parent_Id], 
   childlen_t.[Claim_class_ID],
   childlen_t.[Name],
   childlen_t.[Full_Name],
   childlen_t.[TypeAccess_ID],
   childlen_t.[Sort_index]
   from main
   inner join childlen_t on main.Id=childlen_t.Parent_Id 
   where main.[Parent_сlaim_types_ID] is null)

   select [Id]
  ,[Parent_сlaim_types_ID]
  ,[Claim_class_ID]
  ,[Name]
  ,[Full_Name]
  ,[TypeAccessId]
   from main_2
   order by [Sort_index]


  