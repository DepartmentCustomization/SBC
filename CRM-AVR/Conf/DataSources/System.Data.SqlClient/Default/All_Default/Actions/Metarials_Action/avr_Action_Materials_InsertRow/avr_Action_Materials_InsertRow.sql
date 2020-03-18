declare @out table  (Id int)

INSERT INTO [dbo].[Action_Materials]
           ([Action_ID]
           ,[Material_ID]
           ,[Size]
           ,[Volume]
           ,[In_out]
          -- ,Units_Id
           )
output [inserted].[Id] into @out(Id)
     VALUES
           (@Action_ID
           ,@materials_id
           ,@size_id
           ,@Volume
           ,@In_out
          -- ,@units_id
		   )
		   
		   
declare @mat_id int
set @mat_id = (select TOP(1) Id from @out )

select @mat_id as Id
return;