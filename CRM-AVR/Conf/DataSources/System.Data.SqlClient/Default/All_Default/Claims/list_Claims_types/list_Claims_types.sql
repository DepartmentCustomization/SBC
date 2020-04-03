DECLARE @TypeId INT = (
	SELECT
		TOP 1 Claim_types.[Id]
	FROM
		[dbo].[Claim_types]
	WHERE
		#filter_columns#)
		IF @TypeId = 1 
		BEGIN 
		WITH [Parent_сlaim_types] AS (
			SELECT
				Claim_types.[Id],
				Claim_types.[Parent_сlaim_types_ID],
				Claim_types.[Claim_class_ID],
				Claim_types.[Name],
				Claim_types.[Full_Name],
				Sort_index,
				TypeAccess.Id AS TypeAccessId
			FROM
				[dbo].[Claim_types]
				LEFT JOIN TypeAccess ON TypeAccess.Id = Claim_types.TypeAccess_ID
				AND TypeAccess.Id @typeClaim
			WHERE
				Is_delete != 1
				AND #filter_columns#
		),
		[Child_claim_types] AS (
			SELECT
				[Id],
				[Parent_сlaim_types_ID],
				[Claim_class_ID],
				[Name],
				[Full_Name],
				Sort_index,
				TypeAccessId
			FROM
				[Parent_сlaim_types]
			WHERE
				TypeAccessId @typeClaim
			UNION
			ALL
			SELECT
				[Claim_types].[Id],
				[Claim_types].[Parent_сlaim_types_ID],
				[Claim_types].[Claim_class_ID],
				[Claim_types].[Name],
				[Claim_types].[Full_Name],
				[Claim_types].[Sort_index],
				Claim_types.TypeAccess_ID
			FROM
				[dbo].[Claim_types]
			WHERE
				EXISTS(
					SELECT
						1
					FROM
						[Parent_сlaim_types]
					WHERE
						[Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID]
						AND TypeAccessId @typeClaim
				)
		)
	SELECT
		[Id],
		[Parent_сlaim_types_ID],
		[Claim_class_ID],
		[Name],
		[Full_Name],
		TypeAccessId
	FROM
		[Child_claim_types]
	WHERE
		TypeAccessId @typeClaim
	ORDER BY
		Sort_index
END
ELSE 
BEGIN 
WITH [Parent_сlaim_types] AS (
	SELECT
		Claim_types.[Id],
		Claim_types.[Parent_сlaim_types_ID],
		Claim_types.[Claim_class_ID],
		Claim_types.[Name],
		Claim_types.[Full_Name],
		Sort_index,
		TypeAccess.Id AS TypeAccessId
	FROM
		[dbo].[Claim_types]
		LEFT JOIN TypeAccess ON TypeAccess.Id = Claim_types.TypeAccess_ID
	WHERE
		Is_delete != 1
		AND TypeAccess.Id @typeClaim
		AND #filter_columns#
),
[Child_claim_types] AS (
	SELECT
		[Id],
		[Parent_сlaim_types_ID],
		[Claim_class_ID],
		[Name],
		[Full_Name],
		Sort_index,
		TypeAccessId
	FROM
		[Parent_сlaim_types]
	UNION
	ALL
	SELECT
		[Claim_types].[Id],
		[Claim_types].[Parent_сlaim_types_ID],
		[Claim_types].[Claim_class_ID],
		[Claim_types].[Name],
		[Claim_types].[Full_Name],
		[Claim_types].[Sort_index],
		0 AS TypeAccessId
	FROM
		[dbo].[Claim_types]
	WHERE
		Claim_types.Id IN (
			SELECT
				Id
			FROM
				[Parent_сlaim_types]
			WHERE
				[Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID]
		)
)
SELECT
	[Id],
	[Parent_сlaim_types_ID],
	[Claim_class_ID],
	[Name],
	[Full_Name],
	TypeAccessId
FROM
	[Child_claim_types] -- 		where  TypeAccessId @typeClaim
ORDER BY
	Sort_index
END --------------------------
---------------------------
/*
 
 with [Parent_сlaim_types] as (
 SELECT 
 Claim_types.[Id]
 ,Claim_types.[Parent_сlaim_types_ID]
 ,Claim_types.[Claim_class_ID]
 ,Claim_types.[Name]
 ,Claim_types.[Full_Name]
 ,Sort_index
 FROM [dbo].[Claim_types]
 left join TypeAccess on TypeAccess.Id = Claim_types.TypeAccess_ID
 where Is_delete != 1
 and TypeAccess.Id @typeClaim
 and #filter_columns#
 ),
 [Child_claim_types] as (
 SELECT 
 [Id]
 ,[Parent_сlaim_types_ID]
 ,[Claim_class_ID]
 ,[Name]
 ,[Full_Name]
 ,Sort_index
 FROM [Parent_сlaim_types]
 
 UNION all
 
 SELECT
 [Claim_types].[Id]
 ,[Claim_types].[Parent_сlaim_types_ID]
 ,[Claim_types].[Claim_class_ID]
 ,[Claim_types].[Name]
 ,[Claim_types].[Full_Name]
 ,[Claim_types].[Sort_index]
 from [dbo].[Claim_types]
 -- where exists(select * from [Parent_сlaim_types] where [Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID])
 where exists(select * from [Parent_сlaim_types] where [Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID])
 --where Claim_types.Id in (select Id from [Parent_сlaim_types] where [Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID])
 
 --and Claim_types.Is_delete != 1
 )
 
 
 select 
 [Id]
 ,[Parent_сlaim_types_ID]
 ,[Claim_class_ID]
 ,[Name]
 ,[Full_Name]
 from [Child_claim_types]
 order by Sort_index
 
 */
/*;with [Parent_сlaim_types] as (
 SELECT 
 Claim_types.[Id]
 ,Claim_types.[Parent_сlaim_types_ID]
 ,Claim_types.[Claim_class_ID]
 ,Claim_types.[Name]
 ,[Claim_types].[Full_Name]
 ,Sort_index
 FROM [dbo].[Claim_types]
 left join TypeAccess on TypeAccess.Id = Claim_types.TypeAccess_ID
 where Is_delete != 1
 and TypeAccess.Id @typeClaim
 and   #filter_columns#
 ),
 [Child_claim_types] as (
 
 SELECT 
 [Id]
 ,[Parent_сlaim_types_ID]
 ,[Claim_class_ID]
 ,[Name]
 ,[Full_Name]
 ,Sort_index
 FROM Parent_сlaim_types
 
 union all
 
 select
 [Claim_types].[Id]
 ,[Claim_types].[Parent_сlaim_types_ID]
 ,[Claim_types].[Claim_class_ID]
 ,[Claim_types].[Name]
 ,[Claim_types].[Full_Name]
 ,Claim_types.Sort_index
 from Claim_types
 where Claim_types.Id in (select Id from Parent_сlaim_types where Parent_сlaim_types.Parent_сlaim_types_ID = Claim_types.Id )
 --   where exists (select * from [Parent_сlaim_types] 
 --                 -- where [Parent_сlaim_types].Parent_сlaim_types_ID = Claim_types.Id
 --                 where [Parent_сlaim_types].Id = Claim_types.Parent_сlaim_types_ID
 --                 )
 )
 select 
 [Id]
 ,[Parent_сlaim_types_ID]
 ,[Claim_class_ID]
 ,[Name]
 ,[Full_Name]
 --,Sort_index
 from Child_claim_types
 order by Sort_index
 */
/*
 with [Parent_сlaim_types] as (
 SELECT 
 Claim_types.[Id]
 ,Claim_types.[Parent_сlaim_types_ID]
 ,Claim_types.[Claim_class_ID]
 ,Claim_types.[Name]
 ,[Claim_types].[Full_Name]
 FROM [dbo].[Claim_types]
 left join TypeAccess on TypeAccess.Id = Claim_types.TypeAccess_ID
 where TypeAccess.Id @typeClaim
 and Is_delete != 1
 and   #filter_columns#
 ),
 [Child_claim_types] as (
 
 SELECT 
 [Id]
 ,[Parent_сlaim_types_ID]
 ,[Claim_class_ID]
 ,[Name]
 ,[Full_Name]
 FROM Parent_сlaim_types
 
 union all
 
 select
 [Claim_types].[Id]
 ,[Claim_types].[Parent_сlaim_types_ID]
 ,[Claim_types].[Claim_class_ID]
 ,[Claim_types].[Name]
 ,[Claim_types].[Full_Name]
 from Claim_types
 where Claim_types.Id in (select Id from Parent_сlaim_types where Parent_сlaim_types.Parent_сlaim_types_ID = Claim_types.Id )
 --   where exists (select * from [Parent_сlaim_types] 
 --                 -- where [Parent_сlaim_types].Parent_сlaim_types_ID = Claim_types.Id
 --                 where [Parent_сlaim_types].Id = Claim_types.Parent_сlaim_types_ID
 --                 )
 )
 select 
 [Id]
 ,[Parent_сlaim_types_ID]
 ,[Claim_class_ID]
 ,[Name]
 ,[Full_Name]
 from Child_claim_types
 */