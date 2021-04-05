
INSERT INTO [CRM_1551_GORODOK_Integrartion].[dbo].[ServiceNotification_ServiceTypes]
(
    [ServiceTypeId]
      ,[Name]
)

SELECT @ServiceTypeId
      ,@Name

SELECT @@IDENTITY Id