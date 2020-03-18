declare @TypeId int = (SELECT top 1 Claim_types.[Id] FROM [dbo].[Claim_types] where #filter_columns#)

if @TypeId = 1
begin
		with [Parent_сlaim_types] as (
		   SELECT 
			   Claim_types.[Id]
			  ,Claim_types.[Parent_сlaim_types_ID]
			  ,Claim_types.[Claim_class_ID]
			  ,Claim_types.[Name]
			  ,Claim_types.[Full_Name]
			  ,Sort_index
			  ,TypeAccess.Id as TypeAccessId
		    FROM [dbo].[Claim_types]
		    left join TypeAccess on TypeAccess.Id = Claim_types.TypeAccess_ID and TypeAccess.Id @typeClaim
			where Is_delete != 1
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
			  ,TypeAccessId
		    FROM [Parent_сlaim_types]
		        where TypeAccessId @typeClaim
		    
		    UNION all
		    
		    SELECT
		         [Claim_types].[Id]
		        ,[Claim_types].[Parent_сlaim_types_ID]
		        ,[Claim_types].[Claim_class_ID]
		        ,[Claim_types].[Name]
		        ,[Claim_types].[Full_Name]
		        ,[Claim_types].[Sort_index]
			    ,Claim_types.TypeAccess_ID
		    from [dbo].[Claim_types]
                where exists(select 1 from [Parent_сlaim_types] 
                                where [Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID]
                                and  TypeAccessId @typeClaim)
		)
		
		
		select 
		   [Id]
		  ,[Parent_сlaim_types_ID]
		  ,[Claim_class_ID]
		  ,[Name]
		  ,[Full_Name]
		  ,TypeAccessId
		from [Child_claim_types]
		where TypeAccessId @typeClaim
		order by Sort_index

end
else
begin
		with [Parent_сlaim_types] as (
		   SELECT 
			   Claim_types.[Id]
			  ,Claim_types.[Parent_сlaim_types_ID]
			  ,Claim_types.[Claim_class_ID]
			  ,Claim_types.[Name]
			  ,Claim_types.[Full_Name]
			  ,Sort_index
			  ,TypeAccess.Id as TypeAccessId
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
			  ,TypeAccessId
		    FROM [Parent_сlaim_types]
		    
		    UNION all
		    
		    SELECT
		         [Claim_types].[Id]
		        ,[Claim_types].[Parent_сlaim_types_ID]
		        ,[Claim_types].[Claim_class_ID]
		        ,[Claim_types].[Name]
		        ,[Claim_types].[Full_Name]
		        ,[Claim_types].[Sort_index]
				,0 as TypeAccessId
		    from [dbo].[Claim_types]
		    where Claim_types.Id in (select Id from [Parent_сlaim_types] where [Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID])
		)
		
		
		select 
		   [Id]
		  ,[Parent_сlaim_types_ID]
		  ,[Claim_class_ID]
		  ,[Name]
		  ,[Full_Name]
		  ,TypeAccessId
		from [Child_claim_types]
-- 		where  TypeAccessId @typeClaim
		order by Sort_index
end


--------------------------
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