SELECT [UserId]
      ,[UserName]
      ,[FirstName]
      ,[LastName]
      ,[Avatar]
  FROM [CRM_AVR_System].[dbo].[User]
  
where UserId = @user;