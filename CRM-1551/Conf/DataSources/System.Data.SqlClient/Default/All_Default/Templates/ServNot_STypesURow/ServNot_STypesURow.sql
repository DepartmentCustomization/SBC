
UPDATE [CRM_1551_GORODOK_Integrartion].[dbo].[ServiceNotification_ServiceTypes]
SET
    [ServiceTypeId]=@ServiceTypeId
      ,[Name]=@Name
WHERE Id=@Id