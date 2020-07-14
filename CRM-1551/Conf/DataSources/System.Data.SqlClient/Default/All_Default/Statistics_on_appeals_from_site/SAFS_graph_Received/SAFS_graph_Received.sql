declare @date_table table (Id int identity(1,1), date date)
  declare @date_f date=convert(date, @date_from)

  while @date_f<=convert(date, @date_to)
  begin 
  insert into @date_table (date)
  select @date_f

  set @date_f=dateadd(dd, 1, @date_f)

  end

  --select * from @date_table

  select date_table.Id, date_table.date, isnull([indicator_value],0) [indicator_value]
  from @date_table date_table left join
  [CRM_1551_Site_Integration].[dbo].[Statistic] on date_table.date=[Statistic].date and [Statistic].diagram=6
