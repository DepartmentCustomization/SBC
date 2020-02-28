SELECT [Id]
      --,[Claims_ID]
    --  ,[User]
	  ,isnull((SELECT Surname  +' '+ First_name from Contacts 
		where Id =  (select Contacts_ID from Jobs where [Login] = 
			[User] )), 'mainAdmin') as [User]
      ,[Field]
      ,[New_Value]
      ,[Date]
  FROM [dbo].[Claims_History]
  where Claims_ID = @Id
  and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only