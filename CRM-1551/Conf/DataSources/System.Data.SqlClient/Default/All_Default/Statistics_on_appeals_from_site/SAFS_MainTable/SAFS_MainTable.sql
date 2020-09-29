

/*
declare @date_from date='2019-09-01',
  @date_to date='2020-09-29';
  */
  IF object_id('tempdb..#temp_main') IS NOT NULL DROP TABLE #temp_main

  select 1 Id, ltrim(count(Id))+N' ('+ltrim(convert(numeric(8,2),convert(float,count(Id))/convert(float,1+(datediff(dd, convert(date, @date_from), convert(date, @date_to))))))+N')' cell1,
  
  (select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=dateadd(dd, -1, getutcdate())) cell2,

  case 
  when 
  convert(numeric(8,2),(select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=dateadd(dd, -1, getutcdate())))-
  convert(numeric(8,2),convert(float,count(Id))/convert(float,1+(datediff(dd, convert(date, @date_from), convert(date, @date_to)))))<=0
  then 
  ltrim(convert(numeric(8,2),(select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=dateadd(dd, -1, getutcdate())))-
  convert(numeric(8,2),convert(float,count(Id))/convert(float,1+(datediff(dd, convert(date, @date_from), convert(date, @date_to))))))
  else
  N'+'+ltrim(convert(numeric(8,2),(select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=dateadd(dd, -1, getutcdate())))-
  convert(numeric(8,2),convert(float,count(Id))/convert(float,1+(datediff(dd, convert(date, @date_from), convert(date, @date_to))))))
  end
  cell2_delta,
  ltrim((select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where [AppealFromSiteResultId]=1 and convert(date, ReceiptDate) between convert(date, @date_from) and convert(date, @date_to)))+
  N'('+ltrim((select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=getutcdate() and [AppealFromSiteResultId]=1))+

  N'/'+ltrim((select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)<>getutcdate() and [AppealFromSiteResultId]=1
  and convert(date, ReceiptDate) between convert(date, @date_from) and convert(date, @date_to)))+N')' cell3,

  (select sum([indicator_value])
  
  from [CRM_1551_Site_Integration].[dbo].[Statistic]
  where [indicator_name] in (N'Заяввники без телефону та адреси', N'Заявники без адреси, з телефоном')
  and date between convert(date, @date_from) and convert(date, @date_to)) cell4,

  (select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate) between convert(date, @date_from) and convert(date, @date_to) and [AppealFromSiteResultId]=2) cell5
 /* */


 ,(select count(Id) from [CRM_1551_Site_Integration].[dbo].[ApplicantsFromSite]) cell1_count_applicants
 ,count(distinct ApplicantFromSiteId) cell1_count_applicants_more1appeals
 ,(select count(Id) from [CRM_1551_Site_Integration].[dbo].[ApplicantsFromSite] where [is_verified]='true') cell1_count_applicants_verified
 ,sum(case when charindex(N'Windows', [SystemIP], 1)>1 then 1 else 0 end) cell4_windows
 ,sum(case when charindex(N'android', [SystemIP], 1)>1 then 1 else 0 end) cell4_android
 ,sum(case when charindex(N'Apple', [SystemIP], 1)>1 then 1 else 0 end) cell4_Apple
 --,sum(case when [AppealFromSiteResultId]=2 /*повернуто заявникові*/ then 1 else 0 end) cell5_ReturnToApplicant
 ,(select count(Id) from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] where convert(date,ReceiptDate)=convert(date, getutcdate()) and [AppealFromSiteResultId]=2) cell5_ReturnToApplicant
 into #temp_main
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where convert(date, ReceiptDate) between convert(date, @date_from) and convert(date, @date_to)

  select Id, cell1, cell2, cell2_delta, cell3, cell4, cell5, cell1_count_applicants, cell1_count_applicants_more1appeals
 ,cell1_count_applicants_verified, cell4_windows, cell4_android, cell4_Apple, cell5_ReturnToApplicant
 ,N'test1
 1222' cell1_info
  ,N'test2
 12q22' cell2_info
  ,N'test3
 wwqe' cell3_info
  ,N'test4
 1qw' cell4_info
  ,N'test5
 122ww2' cell5_info
  from #temp_main

  --df
