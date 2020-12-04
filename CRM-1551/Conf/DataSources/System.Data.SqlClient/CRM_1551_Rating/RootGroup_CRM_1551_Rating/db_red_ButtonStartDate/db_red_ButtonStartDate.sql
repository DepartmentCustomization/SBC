
-- declare @Ids nvarchar(500)=N'1,2,3,4',
--   --@user_Id nvarchar(128)=N'test',
--   @DateStart datetime='2019-09-25 17:37:06.090'

  declare @table table (Id int)

  insert into @table (Id)
  select value n
  from string_split((select @Ids n), N',')

  --select * from @table

  update [dbo].[Rating_EtalonDaysToExecution]
  set [DateStart]=@DateStart
  where Id in
  (
  select Id from @table
  )