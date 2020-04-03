declare @TypeId int = (SELECT top 1 [Id] FROM [CRM_AVR_System].[dbo].[OrganisationStructure] where #filter_columns#)

if @TypeId = 1
begin
		with [Parent_org] as (
		   SELECT 
			   [Id]
			  ,[Name]
			  ,[ParentId]
		    FROM [CRM_AVR_System].[dbo].[OrganisationStructure]
			where #filter_columns#
		),
		[Child_org] as (
			SELECT 
			   [Id]
			  ,[Name]
			  ,[ParentId]
		    FROM [Parent_org]
		    
		    UNION all
		    
		    SELECT
		       [Id]
			  ,[Name]
			  ,[ParentId]
		    from [CRM_AVR_System].[dbo].[OrganisationStructure] as org
		    where exists(select * from [Parent_org] where [Parent_org].[Id] = org.[ParentId])

		)
		
		
		select 
		       [Id]
			  ,[Name]
			  ,[ParentId]
		from [Child_org]

end
else
begin
		with [Parent_org] as (
		   SELECT  
			   [Id]
			  ,[Name]
			  ,[ParentId]
		    FROM [CRM_AVR_System].[dbo].[OrganisationStructure]
			where #filter_columns#
		),
		[Child_org] as (
			SELECT 
			   [Id]
			  ,[Name]
			  ,[ParentId]
		    FROM [Parent_org]
		    
		    UNION all
		    
		    SELECT
		       [Id]
			  ,[Name]
			  ,[ParentId]
		    from [CRM_AVR_System].[dbo].[OrganisationStructure] as org
		    where org.Id in (select Id from [Parent_org] where [Parent_org].[Id] = org.[ParentId])
		)
		
		
		select 
		   [Id]
			  ,[Name]
			  ,[ParentId]
		from [Child_org]
end