declare @TypeId int = (SELECT top 1 Claim_types.[Id] FROM [dbo].[Claim_types] where #filter_columns#)

if @TypeId = 1
begin
		with [Parent_сlaim_types] as (
		   SELECT 
			   Claim_types.[Id]
				,Claim_types.[Parent_сlaim_types_ID]
				,Claim_types.[Claim_class_ID]
				,Claim_types.[Name]
				,Claim_types.[Priority]
				,Claim_types.[Is_diameter_required]
				,Claim_types.[Sort_index]
				,Claim_types.[TypeAccess_ID]
				,[Claim_types].[Full_Name]
		    FROM [dbo].[Claim_types]
      left join TypeAccess on TypeAccess.Id = Claim_types.TypeAccess_ID
    	where TypeAccess.Id  @typeClaim
    	and [TypeAccess_ID] <> 100
    	and Is_delete != 1
    	and #filter_columns#
		),
		[Child_claim_types] as (
			SELECT 
			   [Id]
				,[Parent_сlaim_types_ID]
				,[Claim_class_ID]
				,[Name]
				,[Priority]
				,[Is_diameter_required]
				,[Sort_index]
				,[TypeAccess_ID]
				,[Full_Name]
		    FROM [Parent_сlaim_types]
		        where TypeAccess_ID @typeClaim
		    
		    UNION all
		    
		    SELECT
		         [Claim_types].[Id]
				,[Claim_types].[Parent_сlaim_types_ID]
				,[Claim_types].[Claim_class_ID]
				,[Claim_types].[Name]
				,[Claim_types].[Priority]
				,[Claim_types].[Is_diameter_required]
				,[Claim_types].[Sort_index]
				,[Claim_types].[TypeAccess_ID]
				,[Claim_types].[Full_Name]
		    from [dbo].[Claim_types]
                where exists(select 1 from [Parent_сlaim_types] 
                                where [Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID]
                                and  TypeAccess_ID @typeClaim)
		)
		
		
		select 
		   [Id]
          ,[Parent_сlaim_types_ID]
          ,[Claim_class_ID]
          ,[Name]
          ,[Priority]
          ,[Is_diameter_required]
          ,[Sort_index]
          ,[TypeAccess_ID]
          ,[Full_Name]
		from [Child_claim_types]
		where TypeAccess_ID @typeClaim
		and [TypeAccess_ID] = @access_id or [TypeAccess_ID] = 103
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
				,Claim_types.[Priority]
				,Claim_types.[Is_diameter_required]
				,Claim_types.[Sort_index]
				,Claim_types.[TypeAccess_ID]
				,[Claim_types].[Full_Name]
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
				,[Priority]
				,[Is_diameter_required]
				,[Sort_index]
				,[TypeAccess_ID]
				,[Full_Name]
		    FROM [Parent_сlaim_types]
		    
		    UNION all
		    
		    SELECT
		         [Claim_types].[Id]
				,[Claim_types].[Parent_сlaim_types_ID]
				,[Claim_types].[Claim_class_ID]
				,[Claim_types].[Name]
				,[Claim_types].[Priority]
				,[Claim_types].[Is_diameter_required]
				,[Claim_types].[Sort_index]
				,[Claim_types].[TypeAccess_ID]
				,[Claim_types].[Full_Name]
		    from [dbo].[Claim_types]
		    where Claim_types.Id in (select Id from [Parent_сlaim_types] where [Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID])
		)
		
		
		select 
		   [Id]
          ,[Parent_сlaim_types_ID]
          ,[Claim_class_ID]
          ,[Name]
          ,[Priority]
          ,[Is_diameter_required]
          ,[Sort_index]
          ,[TypeAccess_ID]
          ,[Full_Name]
		from [Child_claim_types]
	    where [TypeAccess_ID] = @access_id or [TypeAccess_ID] = 103
		order by Sort_index
end

