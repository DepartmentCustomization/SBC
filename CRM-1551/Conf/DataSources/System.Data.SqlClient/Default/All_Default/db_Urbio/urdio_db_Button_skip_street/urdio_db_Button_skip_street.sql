--declare @Ids nvarchar(300)=N'53F7BCE4-371B-11E7-8000-000C29FF5864,A3E60438-4F51-11E7-8148-000C29FF5864,A3E9BFCE-4F51-11E7-816A-000C29FF5864';

  if object_id('tempdb..#Ids') is not null 
  begin drop table #Ids end

  select value
  into #Ids
  from string_split(@Ids,N',')
  
  update [CRM_1551_URBIO_Integrartion].[dbo].[streets]
  SET [is_done]='true'
	  ,[done_date]=getutcdate()
    ,[user_id]=@user_id
	  ,[comment]=@comment
  where Id in (select [value] from #Ids)