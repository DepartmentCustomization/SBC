
declare @duration int = (select [duration] from [dbo].[claim_types] where Id = @claim_type_id)
declare @controlDate datetime = dateadd(day,@duration,getutcdate())

update [dbo].[appeals] set applicant_id = @applicant_id where Id = @appeal_Id

insert into [dbo].[claims] (
      [claim_type_id]
      ,[appeal_Id]
      ,[claim_category_id]
      ,[control_date]
      ,[House_id]
      ,[Flat]
      ,[comment]
      ,[executor_id]
      ,[state_id]
      ,[created_by]
      ,[updated_by])
-- output inserted.id
values (@claim_type_id
        ,@appeal_Id
		,@claim_category_id
		,@controlDate
		,convert(uniqueidentifier, @House_id)
		,@Flat
		,@comment
		,@executor_id
		,@state_id
		,@UserId
		,@UserId
		)