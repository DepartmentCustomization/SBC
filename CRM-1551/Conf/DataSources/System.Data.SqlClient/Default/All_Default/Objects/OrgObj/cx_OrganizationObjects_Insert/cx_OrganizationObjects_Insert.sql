
INSERT INTO [CRM_1551_Analitics].[dbo].[ExecutorInRoleForObject]
  (
      [executor_role_id]
      ,[executor_id]
      ,[object_id]
  )
SELECT @builbing_id, @conn_type_id, @org_id, @object_id;

