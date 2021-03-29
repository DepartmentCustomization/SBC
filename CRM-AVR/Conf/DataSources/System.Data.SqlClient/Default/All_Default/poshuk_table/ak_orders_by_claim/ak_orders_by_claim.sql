SELECT ROW_NUMBER() OVER(ORDER BY [Orders].Id ASC)  Order_Number
	    ,[Orders].[Id]
      ,[Orders].[Claim_ID]
      ,[Orders].[Created_at]
      ,[Orders].[Start_at]
      ,[Orders].[Plan_duration]
      ,[Orders].[Finished_at]
      ,[Orders].[Closed_at]
      ,[Orders].[Status_ID]
      ,[Orders].[Comment_result]
      ,[Orders].[User_id]
      ,[Orders].[user_edit]
	  ,MIN([Actions].[Start_from]) [Action_Min_Start_from]
	  ,MAX([Actions].[Finish_at]) [Action_Max_Finish_at]
	  ,[Status].Name Status_Name
	  ,isnull([Contacts].[Name],'') + isnull(' (' + [Jobs].[Job_name] + ')','') Job_Contact_Name

	  ,isnull(Order_Created_By.Firstname,'')+isnull(N' ' + Order_Created_By.Patronymic,'') +isnull(N' ' + Order_Created_By.LastName,'') + isnull(N' (' + uio_created_by.JobTitle + N')','')   as User_Created_By 
	  ,isnull(Order_Closed_By.Firstname,'')+isnull(N' ' + Order_Closed_By.Patronymic,'') +isnull(N' ' + Order_Closed_By.LastName,'') + isnull(N' (' + uio_closed_by.JobTitle + N')','')   as User_Closed_By 
	  
  FROM [Orders]
  left join [Actions] on [Actions].Order_Id = [Orders].Id
  left join [Status] on [Status].Id = [Orders].[Status_ID] and [Object] = N'Orders'
  left join [Order_Jobs] on [Order_Jobs].Order_Id = [Orders].Id and [Is_main] = 1
  left join [Jobs] on [Jobs].Id = [Order_Jobs].Job_Id
  left join [Contacts] on [Contacts].Id = [Jobs].[Contacts_ID]

  left join [CRM_AVR_System].[dbo].[User] Order_Created_By  on Order_Created_By.UserId = [Orders].[User_id]
  left join (select UserId, max(id) uio_id from [CRM_AVR_System].[dbo].[UserInOrganisation] group by UserId) uio_created_min on uio_created_min.UserId = Order_Created_By.UserId
  left join [CRM_AVR_System].[dbo].[UserInOrganisation] uio_created_by on uio_created_by.Id  = uio_created_min.uio_id

  left join [CRM_AVR_System].[dbo].[User] Order_Closed_By  on Order_Closed_By.UserId = [Orders].[user_edit] and [Orders].Status_Id = 10
  left join (select UserId, max(id) uio_id from [CRM_AVR_System].[dbo].[UserInOrganisation] group by UserId) uio_closed_min on uio_closed_min.UserId = Order_Closed_By.UserId
  left join [CRM_AVR_System].[dbo].[UserInOrganisation] uio_closed_by on uio_closed_by.Id  = uio_closed_min.uio_id
 
  where [Orders].Claim_Id = @claim_id
  group by [Orders].[Id]
      ,[Orders].[Claim_ID]
      ,[Orders].[Created_at]
      ,[Orders].[Start_at]
      ,[Orders].[Plan_duration]
      ,[Orders].[Finished_at]
      ,[Orders].[Closed_at]
      ,[Orders].[Status_ID]
      ,[Orders].[Comment_result]
      ,[Orders].[User_id]
      ,[Orders].[user_edit]
	  ,[Status].Name
	  ,[Jobs].[Job_name]
	  ,[Order_Jobs].Id
	  ,isnull([Contacts].[Name],'') + isnull(' (' + [Jobs].[Job_name] + ')','')
	  ,isnull(Order_Created_By.Firstname,'')+isnull(N' ' + Order_Created_By.Patronymic,'') +isnull(N' ' + Order_Created_By.LastName,'') + isnull(N' (' + uio_created_by.JobTitle + N')','') 
	  ,isnull(Order_Closed_By.Firstname,'')+isnull(N' ' + Order_Closed_By.Patronymic,'') +isnull(N' ' + Order_Closed_By.LastName,'') + isnull(N' (' + uio_closed_by.JobTitle + N')','')   