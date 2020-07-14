--declare @date_from date='2020-06-01',
--  @date_to date='2020-07-29';


  select 1 Id, ltrim(count(Id))+N' ('+ltrim(convert(numeric(8,2),convert(float,count(Id))/convert(float,(datediff(dd, convert(date, @date_from), convert(date, @date_to))))))+N')' cell1,

  (select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=dateadd(dd, -1, getutcdate())) cell2,

  
  convert(numeric(8,2),(select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=dateadd(dd, -1, getutcdate())))-
  convert(numeric(8,2),convert(float,count(Id))/convert(float,(datediff(dd, convert(date, @date_from), convert(date, @date_to)))))
  cell2_delta,

  ltrim((select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=getutcdate() and [AppealFromSiteResultId]=1))+

  N' ('+ltrim((select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)<>getutcdate() and [AppealFromSiteResultId]=1
  and convert(date, ReceiptDate) between convert(date, @date_from) and convert(date, @date_to)))+N')' cell3,

  (select sum([indicator_value])
  from [CRM_1551_Site_Integration].[dbo].[Statistic]
  where [indicator_name] in (N'Звернення без телефону та адреси', N'Звернення без адреси, з телефоном')
  and date between convert(date, @date_from) and convert(date, @date_to)) cell4,

  (select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate) between convert(date, @date_from) and convert(date, @date_to) and [AppealFromSiteResultId]=2) cell5

  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where convert(date, ReceiptDate) between convert(date, @date_from) and convert(date, @date_to)