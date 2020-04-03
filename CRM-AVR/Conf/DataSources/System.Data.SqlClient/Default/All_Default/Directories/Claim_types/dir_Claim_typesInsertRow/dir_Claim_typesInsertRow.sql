declare  @tab_out table (Id int)

INSERT INTO [dbo].[Claim_types]
           ([Parent_сlaim_types_ID]
           ,[Claim_class_ID]
           ,[Name]
           ,[Priority]
           ,[Is_diameter_required]
           ,[Sort_index]
           ,[TypeAccess_ID]
           ,[Full_Name])
       output [inserted].[Id] into @tab_out (Id)
     VALUES
           (
		   @claim_types_id_first
           ,@classes_id
           ,@claim_types_name
           ,@Priority
           ,@Is_diameter_required
           ,@Sort_index
           ,@access_id
           ,@full_name
		   )
		   
declare @id_type int 
set @id_type = (select top(1) Id from @tab_out)

select @id_type as Id
return 