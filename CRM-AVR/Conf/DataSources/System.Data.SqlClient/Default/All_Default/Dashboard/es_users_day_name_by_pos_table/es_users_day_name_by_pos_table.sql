    
    SELECT 
        Positions.Id
        ,Positions.Name as PositionName
        ,[Shift_date]
        ,Contacts.Name as ContactsName
    FROM [CRM_AVR_Analitics].[dbo].[Shifts_Person]
    left join [Jobs] on [Jobs].Id = [Shifts_Person].Job_Id
    left join  Positions on Positions.Id = Jobs.Position_ID
    left join [Contacts] on Contacts.Id = Jobs.Contacts_ID
    
    where [Shifts_Person].Shift_date = convert(date,getdate())
    
    and Positions.Id = @Id and Jobs.Organization_ID  @Org_Id